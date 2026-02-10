import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, education, experience, skills, jobTitle } = body;

    // Validate input
    if (!name || !email || !education || !experience || !skills) {
      return NextResponse.json(
        { error: '필수 정보를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Generate resume using Claude
    const resumePrompt = `당신은 전문 커리어 컨설턴트입니다. 다음 정보를 바탕으로 한국 기업에 지원할 수 있는 전문적인 이력서를 작성해주세요.

이름: ${name}
이메일: ${email}
전화번호: ${phone || 'N/A'}
지원 직무: ${jobTitle || '일반'}

학력:
${JSON.stringify(education, null, 2)}

경력:
${JSON.stringify(experience, null, 2)}

기술/스킬:
${skills.join(', ')}

**요구사항:**
1. 한국 기업 채용 담당자가 보기 좋은 형식
2. 명확하고 간결한 문장
3. 성과와 수치를 강조
4. Markdown 형식으로 작성
5. 약 500-800자 정도

이력서를 작성해주세요:`;

    const resumeResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: resumePrompt,
        },
      ],
    });

    const generatedResume = resumeResponse.content[0].type === 'text' 
      ? resumeResponse.content[0].text 
      : '';

    // Generate cover letter
    const coverLetterPrompt = `위의 이력서 정보를 바탕으로, ${jobTitle || '해당 직무'}에 지원하는 자기소개서를 작성해주세요.

**요구사항:**
1. 지원 동기
2. 관련 경험 및 성과
3. 입사 후 포부
4. 약 300-500자
5. 진솔하고 열정적인 어조

자기소개서를 작성해주세요:`;

    const coverLetterResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: coverLetterPrompt,
        },
      ],
    });

    const generatedCoverLetter = coverLetterResponse.content[0].type === 'text'
      ? coverLetterResponse.content[0].text
      : '';

    // Save to Supabase
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        name,
        email,
        phone,
        education,
        experience,
        skills,
        generated_resume: generatedResume,
        generated_cover_letter: generatedCoverLetter,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'DB 저장 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      resume: generatedResume,
      coverLetter: generatedCoverLetter,
      id: data.id,
    });
  } catch (error: any) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
