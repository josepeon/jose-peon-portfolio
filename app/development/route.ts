// Standalone product development and production resume, served at /development.
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Jose Peon · Product Development and Production</title>
<meta name="robots" content="noindex" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  @page { size: 1100px 2400px; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; background: #000; color: #fff; font-family: Helvetica, Arial, sans-serif; }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 70px 60px 50px; }
  h1 { font-size: 56px; line-height: 1; margin: 0; text-transform: uppercase; font-weight: 400; }
  .meta { margin-top: 16px; display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
  .meta .title { font-size: 16px; text-transform: uppercase; opacity: .6; }
  .meta span { font-size: 14px; opacity: .4; }
  header { margin-bottom: 36px; }
  section { margin-bottom: 36px; }
  .label { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: .25em; opacity: .4; margin-bottom: 14px; }
  .summary { font-size: 17px; line-height: 1.6; opacity: .75; margin: 0; }
  .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .skills .cat { font-size: 12px; text-transform: uppercase; letter-spacing: .2em; opacity: .5; display: block; margin-bottom: 10px; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag { font-size: 13px; padding: 4px 12px; border: 1px solid rgba(255,255,255,.15); border-radius: 100px; }
  .exp { display: flex; flex-direction: column; gap: 26px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
  .role { font-size: 18px; text-transform: uppercase; }
  .period { font-size: 14px; opacity: .4; }
  .company { font-size: 15px; opacity: .5; display: block; margin-bottom: 10px; }
  ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
  li { font-size: 15px; line-height: 1.55; opacity: .65; padding-left: 16px; position: relative; }
  li::before { content: "·"; position: absolute; left: 0; opacity: .5; }
  .proj { display: flex; flex-direction: column; gap: 22px; }
  .proj .name { font-size: 17px; text-transform: uppercase; }
  .proj .tech { font-size: 13px; opacity: .4; }
  .proj p { font-size: 15px; line-height: 1.55; opacity: .65; margin: 0; }
  .edu .deg { font-size: 16px; text-transform: uppercase; }
  .edu .inst { font-size: 14px; opacity: .5; display: block; }
  .steps { display: flex; flex-direction: column; gap: 18px; }
  .step { display: grid; grid-template-columns: 44px 190px 1fr; gap: 12px; align-items: baseline; }
  .step .n { font-size: 13px; opacity: .4; letter-spacing: .15em; }
  .step .t { font-size: 15px; text-transform: uppercase; }
  .step p { font-size: 15px; line-height: 1.55; opacity: .65; margin: 0; }
  @media (max-width: 700px) { .step { grid-template-columns: 34px 1fr; } .step p { grid-column: 2; } }
  a { color: inherit; text-decoration: none; }
  .tag a { opacity: 1; }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <h1>Jose Peon</h1>
    <div class="meta">
      <span class="title">Product Development and Production</span>
      <span>New York, NY</span>
      <span>josepeon1803@gmail.com</span>
      <span>(786) 521-5379</span>
      <span>josepeon.com</span>
      <span>nooon.online</span>
    </div>
  </header>

  <section>
    <span class="label">Summary</span>
    <p class="summary">Fashion designer and founder of NOOON. I develop garments from pattern to tech pack to sampling to factory handoff, and I handle sourcing, costing, and quality checks on my own collections. I am ready to travel to factories and work to tight timelines. Authorized to work in the US and the EU.</p>
  </section>

  <section>
    <span class="label">Process</span>
    <div class="steps">
      <div class="step"><span class="n">01</span><span class="t">Research and brief</span><p>Define the garment, fit, fabrics, and target cost before any pattern work. Check references, test fabric options, and set the margin target.</p></div>
      <div class="step"><span class="n">02</span><span class="t">Pattern and prototype</span><p>Draft the pattern and build the garment in CLO3D first, then a physical toile to check fit, proportion, pocket placement, and closures. This cuts the number of physical samples.</p></div>
      <div class="step"><span class="n">03</span><span class="t">Tech pack</span><p>A full tech pack and spec sheet for every style: measurements with points of measure, materials, construction, seam finishes, and hardware placement. Fitting corrections go back into the file.</p></div>
      <div class="step"><span class="n">04</span><span class="t">Sampling and factory</span><p>Send pattern files (DXF-ASTM) and spec sheets to the factory in the format its pattern room uses. Review each sample against the spec, send marked corrections, and track sample rounds against the order deadline.</p></div>
      <div class="step"><span class="n">05</span><span class="t">QC and launch</span><p>Check construction, fit, and finish against the spec and defect tolerances before approval. Then product photography, 3D assets, and the online store.</p></div>
    </div>
  </section>

  <section>
    <span class="label">Skills</span>
    <div class="skills">
      <div><span class="cat">Development</span><div class="tags">
        <span class="tag">Pattern-making</span><span class="tag">Grading</span><span class="tag">Toiles and fittings</span><span class="tag">Tech packs</span><span class="tag">Cutter's musts</span><span class="tag">Spec sheets</span><span class="tag">Bills of materials</span><span class="tag">Costing and margins</span>
      </div></div>
      <div><span class="cat">Production</span><div class="tags">
        <span class="tag">Factory handoff (DXF-ASTM, rule files)</span><span class="tag">Sample rounds</span><span class="tag">Production calendars</span><span class="tag">Lead times and order deadlines</span><span class="tag">Supplier sourcing</span><span class="tag">QC inspection</span>
      </div></div>
      <div><span class="cat">Materials</span><div class="tags">
        <span class="tag">French terry (500gsm)</span><span class="tag">Technical wovens</span><span class="tag">Recycled textiles</span><span class="tag">Heat transfers (UV, reflective)</span><span class="tag">Embossing</span><span class="tag">Washes</span><span class="tag">NFC tags</span><span class="tag">Magnetic closures</span>
      </div></div>
      <div><span class="cat">3D and Digital</span><div class="tags">
        <span class="tag">CLO3D</span><span class="tag">Cinema 4D</span><span class="tag">Octane</span><span class="tag">Blender</span><span class="tag">3D scanning</span><span class="tag">3D printing</span><span class="tag">Unreal Engine</span>
      </div></div>
      <div><span class="cat">Tools</span><div class="tags">
        <span class="tag">Adobe Suite</span><span class="tag">Figma</span><span class="tag">Shopify</span>
      </div></div>
      <div><span class="cat">Languages</span><div class="tags">
        <span class="tag">English (native)</span><span class="tag">Spanish (native)</span><span class="tag">French (working)</span>
      </div></div>
    </div>
  </section>

  <section>
    <span class="label">Experience</span>
    <div class="exp">
      <div>
        <div class="row"><span class="role">Founder and Creative Director</span><span class="period">Sep 2024 - Present</span></div>
        <span class="company">NOOON · New York, NY</span>
        <ul>
          <li>Design and develop every collection (HOME, REBOOT, GRDT, RESET): patterns, 3D samples, tech packs, materials, and trims, through to launch.</li>
          <li>Prepare the factory package for each drop and work backward from the factory's order deadline to schedule sampling.</li>
          <li>Built the production system: tech pack and BOM templates, a QC inspection checklist with defect tolerances, and a supplier list with backup sources.</li>
          <li>Developed the Double Hood Hoodie, produced at $60 per unit and sold at $180. It is about 30% of all-time revenue.</li>
          <li>Product collaborations with Converse (9-concept lineup) and Zellerfeld (3D-printed footwear). Debuted at NYFW in Sept 2024. Press in Complex, Highsnobiety, Office, and Metal.</li>
        </ul>
      </div>
      <div>
        <div class="row"><span class="role">Creative and Technical Lead</span><span class="period">Sep 2024 - Present</span></div>
        <span class="company">OH · New York, NY · Hybrid</span>
        <ul>
          <li>Delivered 28 client projects for GOAT, Grailed, Badson, Heliot Emil, and Post Archive Faction, including 3D product visualization, campaign assets, and Shopify builds, on client deadlines.</li>
          <li>Built IMMRSV SHWRM, a real-time showroom with live checkout that anchored a sold-out NYC launch and a Highsnobiety feature.</li>
        </ul>
      </div>
      <div>
        <div class="row"><span class="role">Product and Campaign Development</span><span class="period">Jan 2025 - Jun 2025</span></div>
        <span class="company">Badson · Remote</span>
        <ul>
          <li>Led sample development and art direction from concept through finished drop. Featured in Highsnobiety's Best of 2024, with sold-out releases.</li>
        </ul>
      </div>
      <div>
        <div class="row"><span class="role">Campaign and Product Designer</span><span class="period">Sep 2023 - Apr 2025</span></div>
        <span class="company">Grailed · Contract</span>
        <ul>
          <li>Delivered SS24, SS25, and the Team Uniform program: 3D scanning, product visualization, and campaign content.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <span class="label">Projects</span>
    <div class="proj">
      <div>
        <div class="row"><span class="name">RESET</span><span class="tech">NOOON · Five-piece sampling run</span></div>
        <p>Built the full factory package for the drop: pattern files, spec sheets with measurement points, and construction notes. Sent to the factory in the format its pattern room already uses.</p>
      </div>
      <div>
        <div class="row"><span class="name">Double Hood Hoodie</span><span class="tech">NOOON · Anchor style</span></div>
        <p>Oversized drop-shoulder body, kangaroo pocket, and a double hood. Developed, sampled, and produced at 67% margin.</p>
      </div>
      <div>
        <div class="row"><span class="name">REBOOT</span><span class="tech">NOOON × Zellerfeld · 2025</span></div>
        <p>Modular construction, technical fabrics, NFC in the garments, and fully 3D-printed footwear made custom-fit from phone scans.</p>
      </div>
      <div>
        <div class="row"><span class="name">Converse × NOOON</span><span class="tech">Collaboration · 2026</span></div>
        <p>Developed a 9-concept product lineup and directed a 2-day product and editorial shoot with an 8-person crew.</p>
      </div>
    </div>
  </section>

  <section class="edu">
    <span class="label">Education</span>
    <div class="row"><span class="deg">BFA, Fashion Design</span><span class="period">2022 - 2026</span></div>
    <span class="inst">Parsons School of Design, The New School · Phygital Designer of the Year (2026) · CFDA Design Scholar Award Finalist (2025)</span>
  </section>

  <section>
    <span class="label">Work</span>
    <div class="tags">
      <span class="tag"><a href="https://josepeon.com">josepeon.com</a></span>
      <span class="tag"><a href="https://nooon.online">nooon.online</a></span>
      <span class="tag"><a href="https://josepeon.com/nooon-fw24-home-contents">NYFW Home FW24</a></span>
      <span class="tag"><a href="https://josepeon.com/nooon-fw24-cmpgn-content">FW24 Campaign</a></span>
      <span class="tag"><a href="https://josepeon.com/grailed-team-uniform">Grailed Team Uniform</a></span>
      <span class="tag"><a href="https://josepeon.com/digital-tech-contents">Digital and 3D</a></span>
    </div>
  </section>

</div>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
