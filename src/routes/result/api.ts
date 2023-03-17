const apiKey = '';
const chatCompletionUri = 'https://api.openai.com/v1/chat/completions';
const referenceProblem =
	'$546$ $x$에 대한 이차방정식 $x^{2}-px+p+3=0$이 허근 $alpha$를 가질 때, $a^{3}$이 실수가 되도록 하는 모든 실수 $p$의 값의 곱은? $1$ $-2$ $2$ $-3$ $3$ $-4$ $4$ $-5$ $5$ $-6$';
const referenceSolution = `
  $x=\\alpha$ 가 이차방정식의 근이므로 대입하면
  $\\alpha^{2}-p\\alpha+p+3=0$ 다 $\\alpha^{2}=p\\alpha-p-3$
  $\\alpha^{3}=p\\alpha^{2}-p\\alpha-3\\alpha$
  $=p(p\\alpha-p-3)-p\\alpha-3\\alpha$
  $=p^{2}\\alpha-p^{2}-3p-p\\alpha-3\\alpha$
  $=(p^{2}-p-3)\\alpha-p^{2}-3p$
  $\\alpha^{3}$ 이 실수가 되도록 하려면
  $p^{2}-p-3=0$
  따라서 근과 계수 사이의 관계에 의해 모든 실수 $p$의 곱은 $-3$이다.
`;
const studentProblem = `
 $512$ $x$에 대한 이차방정식 $x^{2}-px+p+1=0$이 허근 $\\alpha$를 가질 때, $a^{3}$이 실수가 되도록 하는 모든 실수 $p$의 값의 곱은?
`;

const systemPrompt = `
  You are the Korean math tutor.
  I will give you
  1. a reference problem and solution
  2. a problem which student asked
  Then, solve the problem in a "step by step" manner(important).
  You must write in Korean.
`;

const assistantPrompt = `
  Reference Problem:
  ${referenceProblem}
  Reference Solution:
  ${referenceSolution}
`;

const userPrompt = `
  Student Problem:
  ${studentProblem}
`;

export async function askGPT() {
	const data = {
		model: 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'assistant', content: assistantPrompt },
			{ role: 'user', content: userPrompt }
		]
	};
	const resp = await fetch(chatCompletionUri, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify(data)
	});

	return await resp.json();
}
