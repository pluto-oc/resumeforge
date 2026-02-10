'use client';

import { useState } from 'react';

type Education = {
  school: string;
  degree: string;
  major: string;
  graduationYear: string;
};

type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    resume: string;
    coverLetter: string;
  } | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [education, setEducation] = useState<Education[]>([
    { school: '', degree: '', major: '', graduationYear: '' },
  ]);
  const [experience, setExperience] = useState<Experience[]>([
    { company: '', position: '', startDate: '', endDate: '', description: '' },
  ]);
  const [skills, setSkills] = useState<string[]>(['']);

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', major: '', graduationYear: '' }]);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: '', position: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          jobTitle,
          education: education.filter((e) => e.school),
          experience: experience.filter((e) => e.company),
          skills: skills.filter((s) => s.trim()),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult({
          resume: data.resume,
          coverLetter: data.coverLetter,
        });
        setStep(3);
      } else {
        alert(data.error || '생성 실패');
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            ResumeForge
          </h1>
          <p className="text-xl text-gray-700">
            AI가 자동으로 작성하는 이력서 & 자기소개서
          </p>
          <p className="text-sm text-gray-500 mt-2">
            클릭 몇 번으로 전문적인 취업 서류 완성 🚀
          </p>
        </header>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">기본 정보</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="전화번호 (선택)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="지원 직무 (예: 프론트엔드 개발자)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!name || !email}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              다음 단계
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">학력</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-4 p-4 border rounded-lg space-y-2">
                  <input
                    type="text"
                    placeholder="학교명"
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[i].school = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="학위 (예: 학사)"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[i].degree = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="전공"
                    value={edu.major}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[i].major = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="졸업 연도 (예: 2024)"
                    value={edu.graduationYear}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[i].graduationYear = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <button
                onClick={addEducation}
                className="text-indigo-600 hover:underline"
              >
                + 학력 추가
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">경력</h2>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4 p-4 border rounded-lg space-y-2">
                  <input
                    type="text"
                    placeholder="회사명"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[i].company = e.target.value;
                      setExperience(newExp);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="직책"
                    value={exp.position}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[i].position = e.target.value;
                      setExperience(newExp);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="시작일 (YYYY-MM)"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[i].startDate = e.target.value;
                        setExperience(newExp);
                      }}
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="종료일 (YYYY-MM)"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[i].endDate = e.target.value;
                        setExperience(newExp);
                      }}
                      className="p-2 border rounded"
                    />
                  </div>
                  <textarea
                    placeholder="주요 업무 및 성과"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[i].description = e.target.value;
                      setExperience(newExp);
                    }}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
              ))}
              <button
                onClick={addExperience}
                className="text-indigo-600 hover:underline"
              >
                + 경력 추가
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">스킬/기술</h2>
              {skills.map((skill, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder="스킬 (예: React, Python)"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...skills];
                    newSkills[i] = e.target.value;
                    setSkills(newSkills);
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button onClick={addSkill} className="text-indigo-600 hover:underline">
                + 스킬 추가
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
              >
                이전
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? '생성 중...' : '이력서 생성하기'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <h2 className="text-3xl font-bold text-center text-indigo-900">
              생성 완료! 🎉
            </h2>

            <div>
              <h3 className="text-2xl font-semibold mb-4">이력서</h3>
              <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
                {result.resume}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">자기소개서</h3>
              <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
                {result.coverLetter}
              </div>
            </div>

            <button
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              새로 작성하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
