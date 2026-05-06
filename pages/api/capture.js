import { Resend } from 'resend';
 
function buildEmail(name, score, label, result) {
  const firstName = name.split(' ')[0];
  const wins = result?.quickWins?.slice(0, 3) || [];
 
  const scoreColor = score <= 3 ? '#E8724A'
    : score <= 5 ? '#D4A832'
    : score <= 7 ? '#2A5082'
    : '#1C3A5C';
 
  const ctaText = score <= 3 ? "Let's build your system from scratch"
    : score <= 5 ? "Let's close the gaps together"
    : score <= 7 ? "You're nearly there — let's get you to full flow"
    : "Let's get you to full flow";
 
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Ops Health Score</title>
</head>
<body style="margin:0;padding:0;background:#FAF3EE;font-family:'Helvetica Neue',Arial,sans-serif;color:#1A1F2E;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">
 
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-flex;align-items:center;gap:8px;">
        <div style="width:28px;height:28px;border-radius:50%;background:#1C3A5C;display:inline-block;line-height:28px;text-align:center;color:white;font-size:12px;font-weight:600;">F</div>
        <span style="font-size:16px;color:#1A1F2E;font-weight:400;">Flow <strong style="color:#E8724A;">Operations</strong></span>
      </div>
    </div>
 
    <!-- Score card -->
    <div style="background:#1C3A5C;border-radius:16px;padding:40px 32px;text-align:center;margin-bottom:24px;">
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 16px;">Your Ops Health Score</p>
      <div style="font-size:80px;font-weight:700;color:${scoreColor};line-height:1;margin-bottom:8px;">
        ${score}<span style="font-size:32px;opacity:.4;font-weight:400;">/10</span>
      </div>
      <p style="font-size:22px;font-style:italic;color:${scoreColor};margin:0 0 20px;">${label}</p>
      <p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,.75);margin:0;max-width:380px;display:inline-block;">
        ${result?.opsExplanation || ''}
      </p>
    </div>
 
    <!-- Greeting -->
    <div style="background:white;border-radius:16px;padding:32px;margin-bottom:16px;border:1px solid #E4D9D0;">
      <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">Hi ${firstName},</p>
      <p style="font-size:15px;line-height:1.7;margin:0;">
        Here's your full results from the Flow Ops Discovery tool. Everything below is specific to your business — keep this somewhere handy.
      </p>
    </div>
 
    <!-- Quick wins -->
    ${wins.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:32px;margin-bottom:16px;border:1px solid #E4D9D0;">
      <p style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#E8724A;margin:0 0 16px;">Your Top Quick Wins</p>
      ${wins.map((w, i) => `
        <div style="display:flex;gap:12px;padding:14px 0;${i < wins.length - 1 ? 'border-bottom:1px solid #FAF3EE;' : ''}">
          <span style="font-size:11px;font-weight:600;color:#1C3A5C;min-width:20px;padding-top:2px;">0${i+1}</span>
          <div>
            <strong style="font-size:14px;font-weight:500;color:#1A1F2E;display:block;margin-bottom:3px;">${w.title}</strong>
            <span style="font-size:13px;color:#6B7280;line-height:1.5;">${w.description}</span>
            ${w.effort ? `<br><span style="font-size:11px;color:#E8724A;font-weight:500;margin-top:4px;display:inline-block;">⏱ ${w.effort}</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>` : ''}
 
    <!-- North star -->
    ${result?.starterPack?.northStar ? `
    <div style="background:#0E1E33;border-radius:16px;padding:28px 32px;margin-bottom:16px;border:1px solid rgba(232,114,74,.2);">
      <p style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#E8724A;margin:0 0 10px;">Your North Star</p>
      <p style="font-size:17px;font-style:italic;color:white;line-height:1.5;margin:0;">"${result.starterPack.northStar}"</p>
    </div>` : ''}
 
    <!-- CTA -->
    <div style="background:#1C3A5C;border-radius:16px;padding:36px 32px;text-align:center;margin-bottom:24px;">
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 12px;">Ready to build this?</p>
      <h2 style="font-size:26px;font-weight:400;color:white;line-height:1.25;margin:0 0 14px;">${ctaText}.</h2>
      <p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,.75);margin:0 0 24px;">
        Let's turn this map into a Notion system that actually runs your business — so you can focus on the work you love.
      </p>
      <a href="https://flowoperations.co.uk" style="display:inline-block;background:#E8724A;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">
        Book a free discovery call →
      </a>
    </div>
 
    <!-- Footer -->
    <div style="text-align:center;padding:20px 0;">
      <p style="font-size:12px;color:#B0A89E;line-height:1.6;margin:0;">
        Charlotte · Flow Operations<br>
        <a href="https://flowoperations.co.uk" style="color:#E8724A;text-decoration:none;">flowoperations.co.uk</a>
      </p>
    </div>
 
  </div>
</body>
</html>`;
}
 
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
 
  const { name, email, score, label, result } = req.body;
 
  if (!name || !email || score == null || !label) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
 
  const errors = [];
 
  // ── Save to Notion ──────────────────────────
  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          'Name':  { title: [{ text: { content: name } }] },
          'Email': { email: email },
          'Score': { number: score },
          'Label': { rich_text: [{ text: { content: label } }] },
        },
      }),
    });
 
    if (!notionRes.ok) {
      const err = await notionRes.json();
      console.error('Notion error:', err);
      errors.push('Notion save failed');
    }
  } catch (e) {
    console.error('Notion catch:', e);
    errors.push('Notion save failed');
  }
 
  // ── Send email via Resend ───────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Charlotte at Flow Operations <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: `Your Ops Health Score: ${score}/10 — ${label}`,
      html: buildEmail(name, score, label, result),
    });
  } catch (e) {
    console.error('Resend catch:', e);
    errors.push('Email send failed');
  }
 
  // Return success even if one part failed — don't block the user
  return res.status(200).json({
    success: true,
    errors: errors.length > 0 ? errors : undefined,
  });
}
 
