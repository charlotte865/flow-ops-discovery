import { useState, useEffect, useRef } from "react";
 
// ─── FLOW OPERATIONS BRAND TOKENS ─────────────
const T = {
  navy:      "#1C3A5C",
  navyDark:  "#142842",
  navyDeep:  "#0E1E33",
  navyMid:   "#2A5082",
  navyLight: "#3D6B9E",
  coral:     "#E8724A",
  coralDark: "#C4522A",
  coralLight:"#F5A58A",
  coralPale: "#FDF0EB",
  cream:     "#FAF3EE",
  warm:      "#F2E8DC",
  white:     "#FFFFFF",
  charcoal:  "#1A1F2E",
  mid:       "#6B7280",
  soft:      "#E4D9D0",
};
 
const SCORES = [
  { range:[1,3],  label:"Reactive & Overwhelmed", color:"#F5A58A", bg:"#2D1208", bar:"#E8724A" },
  { range:[4,5],  label:"Winging It",             color:"#F5C878", bg:"#2A1E08", bar:"#E8A832" },
  { range:[6,7],  label:"Getting There",          color:"#78B8E8", bg:"#0A1E30", bar:"#4A9ACC" },
  { range:[8,9],  label:"Almost in Flow",         color:"#98D0F0", bg:"#081828", bar:"#5AB0DC" },
  { range:[10,10],label:"In Full Flow ✦",         color:"#F5C878", bg:"#0E1E33", bar:"#E8A832" },
];
const getScore = s => SCORES.find(c => s >= c.range[0] && s <= c.range[1]) || SCORES[1];
 
const QUESTIONS = [
  {
    label: "First, tell me about your business.",
    sub:   "What do you do, and who do you love working with?",
    hint:  "No need to be polished — just talk to me like you're explaining it to a friend.",
    ph:    "e.g. I run a brand strategy consultancy for female founders in the wellness space. I mostly work 1:1 but I'm starting to add group programmes…",
  },
  {
    label: "Walk me through a typical week.",
    sub:   "What are you actually doing day to day?",
    hint:  "Think about the tasks that fill your calendar — even the ones you've never written down.",
    ph:    "e.g. Monday I catch up on emails and check in with clients. Tuesday I'm usually writing content or on discovery calls. Wednesday is delivery day…",
  },
  {
    label: "What takes the most time — but probably shouldn't?",
    sub:   "The tasks that eat your week but don't move your business forward.",
    hint:  "This is often where the biggest wins are hiding.",
    ph:    "e.g. Chasing invoices. Answering the same questions in DMs. Re-explaining my onboarding process to every new client…",
  },
  {
    label: "Where do things most often fall apart?",
    sub:   "The moments that feel reactive, scattered, or like you're dropping balls.",
    hint:  "No judgement here — this is exactly what we're here to fix.",
    ph:    "e.g. Client comms get missed when I'm busy. My content ideas are in 4 different places. I never know where I am financially until the end of the month…",
  },
  {
    label: "What would 'truly sorted' look like for you?",
    sub:   "If your business ran beautifully, what would be different?",
    hint:  "Paint me a picture. This becomes your north star.",
    ph:    "e.g. I'd start every week knowing exactly what to focus on. My clients would have a smooth experience. I'd feel calm on a Monday morning instead of overwhelmed…",
  },
];
 
const STAGES = [
  "Reading your answers…",
  "Scoring your operations…",
  "Mapping your core processes…",
  "Building your Notion starter pack…",
  "Putting it all together…",
];
 
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.cream};font-family:'Outfit',sans-serif;color:${T.charcoal};}
.app{min-height:100vh;background:${T.cream};}
 
.hdr{padding:20px 36px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid ${T.soft};position:sticky;top:0;
  background:rgba(250,243,238,0.96);backdrop-filter:blur(8px);z-index:10;}
.logo{display:flex;align-items:center;gap:10px;}
.logo-dot{width:30px;height:30px;border-radius:50%;background:${T.navy};
  display:flex;align-items:center;justify-content:center;
  font-size:12px;color:white;font-weight:600;}
.logo-name{font-family:'Playfair Display',serif;font-size:17px;color:${T.charcoal};}
.logo-name b{color:${T.coral};font-weight:600;}
.hdr-tag{font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;
  color:${T.navy};background:${T.warm};padding:5px 14px;border-radius:20px;border:1px solid ${T.soft};}
 
.prog-wrap{padding:20px 36px 0;max-width:680px;margin:0 auto;}
.prog-track{height:3px;background:${T.soft};border-radius:10px;overflow:hidden;margin-bottom:6px;}
.prog-fill{height:100%;background:${T.coral};border-radius:10px;transition:width 0.4s cubic-bezier(.4,0,.2,1);}
.prog-label{font-size:11px;color:${T.mid};letter-spacing:.5px;}
 
.q-wrap{padding:28px 36px 60px;max-width:680px;margin:0 auto;}
.q-card{background:white;border:1px solid ${T.soft};border-radius:18px;
  padding:36px 40px 32px;box-shadow:0 4px 40px rgba(28,58,92,.07);
  animation:slideUp .35s cubic-bezier(.4,0,.2,1);}
@keyframes slideUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
.q-num{font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:${T.coral};margin-bottom:14px;}
.q-label{font-family:'Playfair Display',serif;font-size:28px;font-weight:400;line-height:1.25;color:${T.charcoal};margin-bottom:8px;}
.q-sub{font-size:14px;color:${T.mid};line-height:1.6;margin-bottom:16px;}
.q-hint{font-size:12px;color:${T.navy};background:rgba(28,58,92,.06);
  padding:10px 14px;border-radius:8px;border-left:3px solid ${T.navy};margin-bottom:18px;line-height:1.5;}
.q-ta{width:100%;min-height:130px;padding:14px 16px;border:1.5px solid ${T.soft};border-radius:10px;
  font-family:'Outfit',sans-serif;font-size:14px;line-height:1.65;color:${T.charcoal};
  background:${T.cream};resize:vertical;transition:border-color .2s,background .2s;outline:none;}
.q-ta:focus{border-color:${T.navy};background:white;}
.q-ta::placeholder{color:#BDB5AC;font-style:italic;}
.q-actions{display:flex;align-items:center;justify-content:space-between;margin-top:20px;gap:12px;}
.btn-back{background:none;border:1.5px solid ${T.soft};color:${T.mid};padding:12px 22px;border-radius:10px;
  font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-back:hover{border-color:${T.navy};color:${T.navy};}
.btn-next{background:${T.navy};color:white;padding:13px 28px;border-radius:10px;border:none;
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;
  transition:all .2s;flex:1;max-width:260px;}
.btn-next:hover:not(:disabled){background:${T.navyDark};transform:translateY(-1px);box-shadow:0 6px 20px rgba(28,58,92,.2);}
.btn-next:disabled{opacity:.4;cursor:not-allowed;}
 
.load-wrap{min-height:60vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:24px;padding:60px 36px;text-align:center;}
.spinner{width:48px;height:48px;border-radius:50%;border:3px solid ${T.soft};border-top-color:${T.coral};animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.load-h{font-family:'Playfair Display',serif;font-size:26px;font-weight:400;color:${T.charcoal};}
.stages{list-style:none;display:flex;flex-direction:column;gap:10px;text-align:left;}
.stage{display:flex;align-items:center;gap:10px;font-size:13px;color:#BDB5AC;transition:all .3s;}
.stage.on{color:${T.navy};font-weight:500;}
.sdot{width:6px;height:6px;border-radius:50%;background:${T.soft};flex-shrink:0;}
.stage.on .sdot{background:${T.coral};}
 
.score-wrap{padding:32px 36px;max-width:680px;margin:0 auto;animation:fadeUp .5s ease;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.score-card{border-radius:20px;padding:48px 40px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden;}
.score-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 60% 20%,rgba(255,255,255,.07) 0%,transparent 60%);}
.sc-ey{font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;opacity:.6;margin-bottom:20px;}
.sc-num{font-family:'Playfair Display',serif;font-size:96px;font-weight:600;line-height:1;margin-bottom:6px;}
.sc-den{font-size:32px;opacity:.4;font-weight:400;}
.sc-lbl{font-family:'Playfair Display',serif;font-size:26px;font-weight:400;font-style:italic;margin-bottom:20px;opacity:.9;}
.sc-bar-t{height:6px;background:rgba(255,255,255,.12);border-radius:10px;max-width:320px;margin:0 auto 28px;overflow:hidden;}
.sc-bar-f{height:100%;border-radius:10px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.sc-exp{font-size:15px;line-height:1.75;opacity:.82;max-width:440px;margin:0 auto 28px;font-weight:300;}
.sc-cta{background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.3);color:white;
  padding:13px 32px;border-radius:12px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
.sc-cta:hover{background:rgba(255,255,255,.24);}
 
.cap-wrap{padding:8px 36px 60px;max-width:680px;margin:0 auto;animation:fadeUp .4s ease;}
.cap-card{background:white;border:1px solid ${T.soft};border-radius:18px;padding:40px;box-shadow:0 4px 40px rgba(28,58,92,.07);}
.cap-icon{font-size:36px;margin-bottom:16px;display:block;}
.cap-h{font-family:'Playfair Display',serif;font-size:30px;font-weight:400;line-height:1.25;margin-bottom:12px;color:${T.charcoal};}
.cap-h em{font-style:italic;color:${T.coral};}
.cap-body{font-size:14px;color:${T.mid};line-height:1.7;margin-bottom:28px;max-width:440px;}
.cap-includes{background:${T.warm};border-radius:12px;padding:18px 20px;margin-bottom:28px;border:1px solid ${T.soft};}
.cap-inc-title{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${T.navy};margin-bottom:12px;}
.cap-inc-list{list-style:none;display:flex;flex-direction:column;gap:8px;}
.cap-inc-item{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:${T.charcoal};line-height:1.5;}
.cap-check{color:${T.coral};font-size:14px;margin-top:1px;flex-shrink:0;}
.cap-fields{display:flex;flex-direction:column;gap:12px;margin-bottom:20px;}
.field-row{display:flex;gap:12px;}
.field-group{display:flex;flex-direction:column;gap:6px;flex:1;}
.field-label{font-size:12px;font-weight:500;color:${T.charcoal};letter-spacing:.3px;}
.field-input{width:100%;padding:13px 16px;border:1.5px solid ${T.soft};border-radius:10px;
  font-family:'Outfit',sans-serif;font-size:14px;color:${T.charcoal};background:${T.cream};outline:none;transition:border-color .2s;}
.field-input:focus{border-color:${T.navy};background:white;}
.field-input::placeholder{color:#BDB5AC;}
.cap-submit{width:100%;padding:15px;background:${T.navy};color:white;border:none;border-radius:10px;
  font-family:'Outfit',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;}
.cap-submit:hover:not(:disabled){background:${T.navyDark};transform:translateY(-1px);box-shadow:0 6px 20px rgba(28,58,92,.2);}
.cap-submit:disabled{opacity:.45;cursor:not-allowed;}
.cap-skip{display:block;text-align:center;font-size:12px;color:${T.mid};margin-top:12px;cursor:pointer;
  background:none;border:none;font-family:'Outfit',sans-serif;text-decoration:underline;text-underline-offset:3px;}
.cap-skip:hover{color:${T.charcoal};}
.cap-sent{display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px 0 8px;text-align:center;}
.cap-sent-icon{font-size:32px;}
.cap-sent-h{font-family:'Playfair Display',serif;font-size:22px;font-weight:400;color:${T.navy};}
.cap-sent-p{font-size:13px;color:${T.mid};line-height:1.6;}
 
.res-wrap{padding:8px 36px 60px;max-width:680px;margin:0 auto;}
.res-intro{text-align:center;padding:32px 0 24px;}
.r-ey{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${T.coral};margin-bottom:10px;}
.r-h{font-family:'Playfair Display',serif;font-size:36px;font-weight:400;line-height:1.2;margin-bottom:10px;}
.r-h em{font-style:italic;color:${T.navy};}
.r-sub{font-size:14px;color:${T.mid};line-height:1.7;max-width:460px;margin:0 auto;}
 
.s-card{background:white;border:1px solid ${T.soft};border-radius:16px;padding:28px 32px;
  margin-bottom:14px;box-shadow:0 2px 20px rgba(28,58,92,.05);animation:fadeUp .5s ease both;}
.s-card:nth-child(1){animation-delay:.05s;}.s-card:nth-child(2){animation-delay:.1s;}
.s-card:nth-child(3){animation-delay:.15s;}.s-card:nth-child(4){animation-delay:.2s;}
.s-head{display:flex;align-items:center;gap:12px;margin-bottom:20px;}
.s-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.s-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:400;color:${T.charcoal};}
.s-desc{font-size:12px;color:${T.mid};margin-top:2px;}
 
.il{list-style:none;display:flex;flex-direction:column;gap:10px;}
.it{display:flex;gap:12px;padding:14px 16px;border-radius:10px;background:${T.cream};border-left:3px solid ${T.navy};}
.it.bt{border-left-color:${T.coral};}
.it.wn{border-left-color:${T.navyLight};}
.it-n{font-size:11px;font-weight:600;color:${T.navy};min-width:20px;margin-top:2px;}
.it-b strong{display:block;font-size:14px;font-weight:500;color:${T.charcoal};margin-bottom:3px;}
.it-b span{font-size:13px;color:${T.mid};line-height:1.55;}
.tt{display:inline-block;margin-top:5px;font-size:11px;color:${T.coral};font-weight:500;}
.sv-row{display:flex;align-items:center;gap:8px;margin-bottom:5px;}
.sv{font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;text-transform:uppercase;}
.sv-High{background:#FFECEC;color:#BB3333;}.sv-Medium{background:#FFF4E0;color:#B37A00;}.sv-Low{background:#EBF3FF;color:#2A5CB3;}
.impact{font-size:12px;color:${T.mid};font-style:italic;margin-top:4px;display:block;}
.mt-row{display:flex;gap:8px;margin-top:7px;flex-wrap:wrap;}
.tag{font-size:11px;font-weight:500;padding:3px 10px;border-radius:10px;}
.tg-e{background:${T.soft};color:${T.mid};}.tg-t{background:rgba(28,58,92,.08);color:${T.navy};}
 
.nc{background:linear-gradient(135deg,rgba(28,58,92,.06) 0%,${T.warm} 100%);border:1px solid rgba(28,58,92,.12);}
.nc-intro{font-size:14px;line-height:1.75;color:${T.charcoal};margin-bottom:20px;}
.ph-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
.ph{display:flex;gap:14px;align-items:flex-start;}
.ph-badge{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;
  padding:4px 12px;background:${T.navy};color:white;border-radius:20px;white-space:nowrap;flex-shrink:0;margin-top:3px;}
.ph-b strong{font-size:14px;font-weight:500;color:${T.charcoal};display:block;margin-bottom:3px;}
.ph-b span{font-size:13px;color:${T.mid};line-height:1.55;}
 
.sp-card{background:${T.navyDeep};border:1px solid rgba(232,114,74,.2);border-radius:18px;
  padding:36px 36px 32px;margin-bottom:14px;animation:fadeUp .5s .3s ease both;}
.sp-badge{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;
  color:${T.coral};background:rgba(232,114,74,.15);padding:5px 14px;border-radius:20px;
  border:1px solid rgba(232,114,74,.3);display:inline-block;margin-bottom:12px;}
.sp-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:400;color:white;margin-bottom:8px;}
.sp-intro{font-size:13px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:24px;}
.sp-north{background:rgba(232,114,74,.12);border:1px solid rgba(232,114,74,.25);border-radius:12px;padding:16px 20px;margin-bottom:24px;}
.sp-north-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${T.coral};margin-bottom:6px;}
.sp-north-text{font-family:'Playfair Display',serif;font-size:17px;font-style:italic;color:white;line-height:1.5;}
.sp-sec{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:14px;}
.db-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
.db-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 16px;}
.db-card.db-first{background:rgba(232,114,74,.1);border-color:rgba(232,114,74,.35);}
.db-top{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.db-icon{font-size:18px;}.db-name{font-size:13px;font-weight:500;color:white;}
.db-card.db-first .db-name{color:${T.coralLight};}
.db-why{font-size:12px;color:rgba(255,255,255,.5);line-height:1.5;}
.first-tag{font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;
  color:${T.coral};background:rgba(232,114,74,.2);padding:2px 7px;border-radius:8px;margin-left:auto;}
.w1-list{list-style:none;display:flex;flex-direction:column;gap:10px;}
.w1-item{display:flex;gap:14px;align-items:flex-start;}
.w1-day{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${T.coral};min-width:44px;margin-top:3px;}
.w1-b strong{font-size:13px;font-weight:500;color:white;display:block;margin-bottom:2px;}
.w1-b span{font-size:12px;color:rgba(255,255,255,.5);line-height:1.5;}
.w1-time{display:inline-block;margin-top:4px;font-size:11px;color:rgba(232,114,74,.8);font-weight:500;}
 
.share-wrap{margin-bottom:14px;}
.share-card{background:${T.warm};border:1px solid ${T.soft};border-radius:14px;
  padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.share-text{font-size:13px;color:${T.charcoal};line-height:1.6;flex:1;}
.share-text strong{display:block;font-size:14px;font-weight:500;margin-bottom:4px;color:${T.navy};}
.share-btn{background:${T.navy};color:white;padding:10px 20px;border-radius:10px;border:none;
  font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;}
.share-btn:hover{background:${T.navyDark};}
.share-btn.copied{background:${T.coral};}
 
.cta-card{background:${T.navy};border-radius:18px;padding:40px 36px;margin-bottom:14px;text-align:center;color:white;}
.cta-ey{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${T.coralLight};margin-bottom:12px;}
.cta-h{font-family:'Playfair Display',serif;font-size:30px;font-weight:400;line-height:1.25;margin-bottom:14px;}
.cta-p{font-size:14px;line-height:1.75;opacity:.82;max-width:420px;margin:0 auto 28px;font-weight:300;}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn-w{background:white;color:${T.navy};padding:14px 28px;border-radius:10px;border:none;
  cursor:pointer;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;transition:all .2s;}
.btn-w:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,.2);}
.btn-g{background:transparent;color:white;padding:14px 28px;border-radius:10px;
  border:1.5px solid rgba(255,255,255,.3);font-family:'Outfit',sans-serif;font-size:14px;cursor:pointer;transition:all .2s;}
.btn-g:hover{border-color:white;background:rgba(255,255,255,.08);}
.restart{text-align:center;padding:16px 0 8px;}
.restart button{background:none;border:none;font-family:'Outfit',sans-serif;font-size:13px;
  color:${T.mid};cursor:pointer;text-decoration:underline;text-underline-offset:3px;}
.restart button:hover{color:${T.charcoal};}
.err-box{background:#FFF0EE;border:1px solid #F5C4B8;border-radius:12px;padding:16px 20px;
  margin:24px 36px;font-size:13px;color:#C04020;line-height:1.6;}
 
@media(max-width:600px){
  .hdr{padding:16px 20px;}
  .prog-wrap,.q-wrap,.score-wrap,.cap-wrap,.res-wrap{padding-left:20px;padding-right:20px;}
  .q-card{padding:24px 20px;}.q-label{font-size:22px;}.sc-num{font-size:72px;}
  .cap-card{padding:24px 20px;}.field-row{flex-direction:column;}
  .s-card{padding:20px;}.db-grid{grid-template-columns:1fr;}
  .cta-card{padding:28px 20px;}.cta-h{font-size:24px;}.sp-card{padding:24px 20px;}
  .share-card{flex-direction:column;align-items:flex-start;}
}
`;
 
export default function FlowDiscovery() {
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState(Array(5).fill(""));
  const [view, setView]         = useState("questions");
  const [result, setResult]     = useState(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [scoreVal, setScoreVal] = useState(0);
  const [barW, setBarW]         = useState(0);
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState("");
  const timerRef   = useRef(null);
  const resultsRef = useRef(null);
 
  const startStages = () => {
    let i = 0; setStageIdx(0);
    timerRef.current = setInterval(() => { i++; if(i < STAGES.length) setStageIdx(i); }, 2200);
  };
  const stopStages = () => clearInterval(timerRef.current);
  useEffect(() => () => stopStages(), []);
 
  useEffect(() => {
    if(view === "score" && result?.opsScore != null) {
      const target = result.opsScore; let cur = 0;
      const t = setInterval(() => {
        cur++; setScoreVal(cur);
        if(cur >= target) { clearInterval(t); setTimeout(() => setBarW((target/10)*100), 100); }
      }, 80);
      return () => clearInterval(t);
    }
  }, [view, result]);
 
  const upd = v => { const a = [...answers]; a[step] = v; setAnswers(a); };
  const canNext = answers[step].trim().length >= 15;
  const canSubmitEmail = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
 
  const getScoreCTA = score => {
    if(score <= 3) return { h: "Let's build your system from scratch.", p: "A full Notion build is exactly what you need right now — and it'll change everything." };
    if(score <= 5) return { h: "Let's close the gaps together.", p: "You're further along than you think. A few targeted fixes will transform your week." };
    if(score <= 7) return { h: "You're nearly there.", p: "A Notion audit will show us exactly where to focus for maximum impact." };
    return { h: "Let's get you to full flow.", p: "You're running a tight ship. A few refinements and you'll be there." };
  };
 
  // ── Analyse via API route ──
  const runAnalysis = async () => {
    setView("loading"); startStages();
    try {
      const res  = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json(); stopStages();
      if(!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data);
      setView("score");
    } catch(e) {
      stopStages(); setError(e.message); setView("error");
    }
  };
 
  // ── Capture email via API route ──
  const submitEmail = async () => {
    setSending(true);
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, score: result?.opsScore, label: result?.opsLabel, result }),
      });
    } catch(_) {}
    setSent(true); setSending(false);
    setTimeout(() => {
      setView("results");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }, 1800);
  };
 
  const copyScore = () => {
    const text = `I just took the Flow Operations Ops Health Check and scored ${result?.opsScore}/10 — ${result?.opsLabel}.\n\nIf your business ops feel a bit chaotic, I'd highly recommend giving it a go 👇\n[add your link here]`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  };
 
  const cfg    = result ? getScore(result.opsScore ?? 5) : SCORES[1];
  const ctaCopy = result ? getScoreCTA(result.opsScore ?? 5) : { h: "", p: "" };
 
  const reset = () => {
    setStep(0); setAnswers(Array(5).fill("")); setResult(null);
    setScoreVal(0); setBarW(0); setName(""); setEmail("");
    setSent(false); setCopied(false); setError(""); setView("questions");
  };
 
  return (
    <>
      <style>{CSS}</style>
      <div className="app">
 
        <header className="hdr">
          <div className="logo">
            <div className="logo-dot">F</div>
            <span className="logo-name">Flow <b>Operations</b></span>
          </div>
          <span className="hdr-tag">Free Ops Discovery</span>
        </header>
 
        {/* QUESTIONS */}
        {(view === "questions" || view === "error") && (
          <>
            {view === "error" && <div className="err-box">⚠️ {error} — please try again.</div>}
            <div className="prog-wrap">
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${((step+1)/QUESTIONS.length)*100}%` }}/>
              </div>
              <p className="prog-label">Question {step+1} of {QUESTIONS.length}</p>
            </div>
            <div className="q-wrap">
              <div className="q-card" key={step}>
                <p className="q-num">Question {String(step+1).padStart(2,"0")}</p>
                <h2 className="q-label">{QUESTIONS[step].label}</h2>
                <p className="q-sub">{QUESTIONS[step].sub}</p>
                <p className="q-hint">💡 {QUESTIONS[step].hint}</p>
                <textarea className="q-ta" value={answers[step]}
                  onChange={e => upd(e.target.value)}
                  placeholder={QUESTIONS[step].ph} rows={6} autoFocus/>
                <div className="q-actions">
                  {step > 0 ? <button className="btn-back" onClick={() => setStep(s => s-1)}>← Back</button> : <div/>}
                  {step < QUESTIONS.length-1
                    ? <button className="btn-next" disabled={!canNext} onClick={() => setStep(s => s+1)}>Next →</button>
                    : <button className="btn-next" disabled={!canNext} onClick={runAnalysis}>✦ Get my Ops Score →</button>
                  }
                </div>
              </div>
            </div>
          </>
        )}
 
        {/* LOADING */}
        {view === "loading" && (
          <div className="load-wrap">
            <div className="spinner"/>
            <h2 className="load-h">Analysing your business…</h2>
            <ul className="stages">
              {STAGES.map((s,i) => (
                <li key={i} className={`stage ${i === stageIdx ? "on" : ""}`}>
                  <div className="sdot"/>{s}
                </li>
              ))}
            </ul>
          </div>
        )}
 
        {/* SCORE */}
        {view === "score" && result && (
          <div className="score-wrap">
            <div className="score-card" style={{ background: cfg.bg, color: cfg.color }}>
              <p className="sc-ey" style={{ color: cfg.color }}>Your Ops Health Score</p>
              <div className="sc-num">{scoreVal}<span className="sc-den">/10</span></div>
              <p className="sc-lbl" style={{ color: cfg.color }}>{result.opsLabel || cfg.label}</p>
              <div className="sc-bar-t">
                <div className="sc-bar-f" style={{ width: `${barW}%`, background: cfg.bar }}/>
              </div>
              <p className="sc-exp">{result.opsExplanation}</p>
              <button className="sc-cta" onClick={() => setView("capture")}>
                Unlock your full results + Notion starter pack ↓
              </button>
            </div>
          </div>
        )}
 
        {/* CAPTURE */}
        {view === "capture" && result && (
          <div className="cap-wrap">
            <div className="cap-card">
              {!sent ? (
                <>
                  <span className="cap-icon">🎁</span>
                  <h2 className="cap-h">Your full map +<br/><em>personalised starter pack</em> is ready.</h2>
                  <p className="cap-body">Pop your details below and I'll send everything straight to your inbox — including your Notion starter pack built specifically for your business.</p>
                  <div className="cap-includes">
                    <p className="cap-inc-title">What you're getting</p>
                    <ul className="cap-inc-list">
                      {["Your full process map with time estimates","Your bottleneck breakdown with severity ratings","Quick wins you can action this week","A phased Notion implementation plan","Your personalised Notion Starter Pack with a Week 1 action plan"].map((t,i) => (
                        <li key={i} className="cap-inc-item"><span className="cap-check">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cap-fields">
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">First name</label>
                        <input className="field-input" value={name} onChange={e => setName(e.target.value)} placeholder="Charlotte"/>
                      </div>
                      <div className="field-group">
                        <label className="field-label">Email address</label>
                        <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com"/>
                      </div>
                    </div>
                  </div>
                  <button className="cap-submit" disabled={!canSubmitEmail || sending} onClick={submitEmail}>
                    {sending ? "Sending…" : "✦ Send me my results →"}
                  </button>
                  <button className="cap-skip" onClick={() => { setView("results"); setTimeout(() => resultsRef.current?.scrollIntoView({ behavior:"smooth" }), 100); }}>
                    No thanks, just show me the results
                  </button>
                </>
              ) : (
                <div className="cap-sent">
                  <span className="cap-sent-icon">✉️</span>
                  <h3 className="cap-sent-h">On its way, {name.split(" ")[0]}!</h3>
                  <p className="cap-sent-p">Check your inbox. Loading your full results now…</p>
                </div>
              )}
            </div>
          </div>
        )}
 
        {/* RESULTS */}
        {view === "results" && result && (
          <div className="res-wrap" ref={resultsRef}>
            <div className="res-intro">
              <p className="r-ey">✦ Your Process Map</p>
              <h2 className="r-h">Here's <em>exactly</em> what I found.</h2>
              <p className="r-sub">{result.summary}</p>
            </div>
 
            <div className="s-card">
              <div className="s-head">
                <div className="s-icon" style={{background:"rgba(28,58,92,.08)"}}>🗂️</div>
                <div><div className="s-title">Your Core Processes</div><div className="s-desc">Everything you're currently managing</div></div>
              </div>
              <ul className="il">
                {result.processes?.map((p,i) => (
                  <li key={i} className="it">
                    <span className="it-n">0{i+1}</span>
                    <div className="it-b"><strong>{p.name}</strong><span>{p.description}</span>
                    {p.timeImpact && <span className="tt">⏱ {p.timeImpact}</span>}</div>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="s-card">
              <div className="s-head">
                <div className="s-icon" style={{background:"rgba(232,114,74,.1)"}}>⚡</div>
                <div><div className="s-title">Your Bottlenecks</div><div className="s-desc">What's slowing you down right now</div></div>
              </div>
              <ul className="il">
                {result.bottlenecks?.map((b,i) => (
                  <li key={i} className="it bt">
                    <div className="it-b" style={{width:"100%"}}>
                      <div className="sv-row">
                        <strong style={{fontSize:14}}>{b.title}</strong>
                        <span className={`sv sv-${b.severity}`}>{b.severity}</span>
                      </div>
                      <span>{b.description}</span>
                      {b.impact && <span className="impact">Impact: {b.impact}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="s-card">
              <div className="s-head">
                <div className="s-icon" style={{background:"rgba(28,58,92,.06)"}}>🏆</div>
                <div><div className="s-title">Your Quick Wins</div><div className="s-desc">Changes you can make this week</div></div>
              </div>
              <ul className="il">
                {result.quickWins?.map((w,i) => (
                  <li key={i} className="it wn">
                    <span className="it-n">0{i+1}</span>
                    <div className="it-b"><strong>{w.title}</strong><span>{w.description}</span>
                    <div className="mt-row">
                      {w.effort && <span className="tag tg-e">⏱ {w.effort}</span>}
                      {w.tool   && <span className="tag tg-t">🔧 {w.tool}</span>}
                    </div></div>
                  </li>
                ))}
              </ul>
            </div>
 
            {result.notionPlan && (
              <div className="s-card nc">
                <div className="s-head">
                  <div className="s-icon" style={{background:"rgba(28,58,92,.08)"}}>⬜</div>
                  <div><div className="s-title">Your Notion Plan</div><div className="s-desc">A phased roadmap for your business</div></div>
                </div>
                <p className="nc-intro">{result.notionPlan.intro}</p>
                <ul className="ph-list">
                  {result.notionPlan.phases?.map((ph,i) => (
                    <li key={i} className="ph">
                      <span className="ph-badge">{ph.phase}</span>
                      <div className="ph-b"><strong>{ph.title}</strong><span>{ph.description}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            {result.starterPack && (
              <div className="sp-card">
                <span className="sp-badge">✦ Your Notion Starter Pack</span>
                <h3 className="sp-title">Personalised for your business.</h3>
                <p className="sp-intro">{result.starterPack.intro}</p>
                {result.starterPack.northStar && (
                  <div className="sp-north">
                    <p className="sp-north-label">Your North Star</p>
                    <p className="sp-north-text">"{result.starterPack.northStar}"</p>
                  </div>
                )}
                <p className="sp-sec">Build these databases first</p>
                <div className="db-grid">
                  {result.starterPack.databases?.map((db,i) => (
                    <div key={i} className={`db-card ${db.priority==="Start here"?"db-first":""}`}>
                      <div className="db-top">
                        <span className="db-icon">{db.icon}</span>
                        <span className="db-name">{db.name}</span>
                        {db.priority==="Start here" && <span className="first-tag">Start here</span>}
                      </div>
                      <p className="db-why">{db.why}</p>
                    </div>
                  ))}
                </div>
                <p className="sp-sec">Your Week 1 action plan</p>
                <ul className="w1-list">
                  {result.starterPack.weekOne?.map((d,i) => (
                    <li key={i} className="w1-item">
                      <span className="w1-day">{d.day}</span>
                      <div className="w1-b"><strong>{d.task}</strong><span>{d.outcome}</span>
                      {d.time && <span className="w1-time">⏱ {d.time}</span>}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            <div className="share-wrap">
              <div className="share-card">
                <div className="share-text">
                  <strong>Share your score 📣</strong>
                  One click copies a ready-made LinkedIn post with your result.
                </div>
                <button className={`share-btn ${copied?"copied":""}`} onClick={copyScore}>
                  {copied ? "✓ Copied!" : "Copy my score"}
                </button>
              </div>
            </div>
 
            <div className="cta-card">
              <p className="cta-ey">✦ Ready to build this?</p>
              <h3 className="cta-h">{ctaCopy.h}</h3>
              <p className="cta-p">{ctaCopy.p}</p>
              <div className="cta-btns">
                <button className="btn-w" onClick={() => window.open("https://flowoperations.co.uk","_blank")}>Book a free discovery call →</button>
                <button className="btn-g" onClick={() => window.open("https://flowoperations.co.uk","_blank")}>See how I work</button>
              </div>
            </div>
 
            <div className="restart"><button onClick={reset}>← Start a new discovery</button></div>
          </div>
        )}
 
      </div>
    </>
  );
}
 
