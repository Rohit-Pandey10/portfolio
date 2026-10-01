function escapeLatex(value) {
  return String(value)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([{}%$&#_^])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}');
}

function readMetric(stats, nestedKey, flatKeys, fallback) {
  const flatKeysArray = Array.isArray(flatKeys) ? flatKeys : [flatKeys];
  return stats?.[nestedKey] ?? flatKeysArray.map((key) => stats?.[key]).find((value) => value != null) ?? fallback;
}

function formatApproximate(stats, fallback) {
  const result = readMetric(stats, 'totalSolved', ['problemsSolved', 'totalProblemsSolved'], fallback);
  if (stats?.source && stats.source !== 'platform-apis' && /^\d+$/.test(String(result))) {
    return `${result}+`;
  }
  return result;
}

/** Build the complete resume source using live CP stats. */
export function getResumeLatex(stats = {}) {
  const codeforces = stats.codeforces ?? stats;
  const codechef = stats.codechef ?? stats;
  const leetcode = stats.leetcode ?? stats;
  const values = {
    totalSolved: escapeLatex(formatApproximate(stats, '350+')),
    contestsCount: escapeLatex(readMetric(stats, 'totalContests', ['contests', 'contestsAttended'], '39')),
    codeforcesRating: escapeLatex(readMetric(codeforces, 'rating', 'codeforcesRating', '1109')),
    codeforcesMax: escapeLatex(readMetric(codeforces, 'maxRating', 'codeforcesMaxRating', '1199')),
    codechefRating: escapeLatex(readMetric(codechef, 'rating', 'codechefRating', '1406')),
    codechefMax: escapeLatex(readMetric(codechef, 'maxRating', 'codechefMaxRating', '1426')),
    leetcodeSolved: escapeLatex(readMetric(leetcode, 'totalSolved', ['solved', 'leetcodeSolved'], '80+')),
    codechefDsa: escapeLatex(readMetric(codechef, 'dsaRating', 'codechefDsaRating', '1508')),
  };

  const tex = `\\documentclass[10pt, letterpaper]{article}
\\usepackage[top=0.48in,bottom=0.48in,left=0.60in,right=0.60in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\titleformat{\\section}{\\normalsize\\bfseries}{}{0pt}{}[\\vspace{-3pt}\\rule{\\textwidth}{0.45pt}]
\\titlespacing{\\section}{0pt}{6pt}{3pt}
\\setlist[itemize]{leftmargin=14pt,itemsep=1pt,topsep=1pt,parsep=0pt,partopsep=0pt}
\\renewcommand{\\labelitemi}{\\textbullet}

\\begin{document}
\\begin{center}
    {\\Large \\textbf{Rohit Pandey}} \\\\[2pt]
    Mumbai, India \\\\
    \\href{mailto:rohitpdev@gmail.com}{rohitpdev@gmail.com}
    \\enspace|\\enspace \\href{https://rohit-pandey10.vercel.app}{Portfolio}
    \\enspace|\\enspace \\href{https://github.com/Rohit-Pandey10}{GitHub}
    \\enspace|\\enspace \\href{https://www.linkedin.com/in/rohit-pandey-964b1036a/}{LinkedIn}
\\end{center}

\\section{Profile}
Computer Engineering student interested in full-stack web development, backend systems, AI-assisted applications, and problem solving. Experienced with the MERN stack, REST APIs, MVC architecture, MongoDB, authentication, LaTeX generation, and LLM integrations. Actively strengthening Data Structures and Algorithms through competitive programming.

\\section{Education}
\\textbf{Dwarkadas J. Sanghvi College of Engineering} \\hfill Mumbai, India \\\\
Bachelor of Technology (B.Tech.) in Computer Engineering \\hfill 2025 -- 2029 \\\\
CGPA: 9.45

\\section{Projects}
\\textbf{BrandLoom -- AI Brand Strategy \\& Marketing Platform} \\hfill \\textit{MERN Stack, Tailwind CSS, LLM}\\
\\textbf{\\href{https://brand-loom.vercel.app}{Live Website}} \\enspace|\\enspace \\textbf{\\href{https://github.com/Rohit-Pandey10/BrandLoom}{GitHub}}
\\begin{itemize}
    \\item Built an adaptive Socratic brand strategy platform that interviews founders to derive positioning, tone, customer insights, and brand identity before generating brand assets.
    \\item Architected a dual-LLM pipeline using Groq Llama 3.3 70B as the primary model and Gemini as a fallback, improving resilience against provider outages and rate limits.
    \\item Implemented MongoDB Atlas with automatic local JSON fallback so the application can gracefully handle database unavailability.
    \\item Developed a prompt-engineering layer that uses founder responses to personalize generated brand kits instead of producing generic templated output.
    \\item Shipped a React 18 + Vite + Tailwind CSS frontend with a Node.js/Express backend API within a 24-hour hackathon.
\\end{itemize}
\\textbf{JakeResume -- ATS LaTeX Resume Platform} \\hfill \\textit{MERN Stack, Tailwind CSS, LaTeX}\\
\\textbf{\\href{https://jake-resume-builder10.vercel.app}{Live Website}} \\enspace|\\enspace \\textbf{\\href{https://github.com/Rohit-Pandey10/resume_agy}{GitHub}}
\\begin{itemize}
    \\item Developed a full-stack resume platform that converts structured profile data into ATS-friendly LaTeX resumes with automated formatting.
    \\item Built a client-side reactive LaTeX generator with bullet-level controls and deterministic sanitization of reserved LaTeX characters and macros.
    \\item Designed a 3-tier compilation architecture supporting an Express proxy, remote pdflatex compilation, client-side \\texttt{.tex} generation, and direct Overleaf dispatch.
    \\item Implemented an AI ingestion pipeline to sanitize unstructured LLM extraction payloads and normalize nested resume content.
    \\item Added a real-time 48-line page-budget estimator to prevent multi-page layouts and maintain one-page resume output.
\\end{itemize}

\\section{Competitive Programming}
\\begin{itemize}
    \\item Solved \\textbf{${values.totalSolved} algorithmic problems} across LeetCode, CodeChef, Codeforces, and AtCoder, covering Data Structures, Algorithms, and competitive programming.
    \\item Participated in \\textbf{${values.contestsCount} coding contests} across multiple competitive programming platforms.
    \\item \\textbf{CodeChef: ${values.codechefRating}} (Max: ${values.codechefMax}) \\quad \\textbf{Codeforces: ${values.codeforcesRating}} (Max: ${values.codeforcesMax})
    \\item \\textbf{LeetCode: ${values.leetcodeSolved}} \\quad \\textbf{CodeChef DSA: ${values.codechefDsa}} (Max: ${values.codechefDsa})
\\end{itemize}

\\section{Technical Skills}
\\textbf{Languages:} JavaScript, C++, C, Java, Python \\\\
\\textbf{Frontend:} HTML5, CSS3, Tailwind CSS, React.js, Vite \\\\
\\textbf{Backend:} Node.js, Express.js, REST APIs, MongoDB, MySQL \\\\
\\textbf{Tools:} Git, GitHub, Postman, VS Code, Antigravity
\\end{document}`;

  // Template literals turn each escaped pair into one backslash. Restore
  // LaTeX's double-backslash line breaks before returning the source.
  return tex.replace(/(?<!\\)\\\n/g, '\\\\\n');
}
