import { getResumeLatex } from '../templates/resumeLatexTemplate';

const FALLBACK_URL = `${import.meta.env.BASE_URL}resume.pdf`;

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Rohit_Pandey_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadFallback() {
  const link = document.createElement('a');
  link.href = FALLBACK_URL;
  link.download = 'Rohit_Pandey_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/** Compile the live resume source through the same-origin LaTeX proxy. */
export async function downloadDynamicResume(stats = {}) {
  try {
    const tex = getResumeLatex(stats);
    console.info('[Resume] Sending live metrics to LaTeX compiler:', JSON.stringify({
      totalSolved: stats.totalSolved ?? stats.problemsSolved ?? stats.totalProblemsSolved,
      totalContests: stats.totalContests ?? stats.contests ?? stats.contestsAttended,
      leetcodeRating: stats.leetcode?.rating ?? stats.leetcodeContestRating,
    }));

    const response = await fetch('/api/compile-latex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tex }),
    });

    const contentType = response.headers.get('content-type') || '';
    console.info('[Resume] LaTeX compiler response:', JSON.stringify({
      status: response.status,
      contentType,
      ok: response.ok,
    }));

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`LaTeX compilation failed with status ${response.status}: ${detail.slice(0, 300)}`);
    }

    downloadBlob(await response.blob());
  } catch (error) {
    console.error('[Resume] LaTeX compilation failed; downloading the static fallback /resume.pdf.', error);
    downloadFallback();
  }
}
