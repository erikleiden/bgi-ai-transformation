// Pre-loaded O*NET data for three roles
// Source: Abbe API (O*NET-based)

export const JOB_CATEGORIES = [
  { id: 'operations', label: 'Operations & Logistics', icon: '📦' },
  { id: 'business', label: 'Business & Management', icon: '💼' },
  { id: 'admin', label: 'Administrative & Support', icon: '🗂️' },
]

export const INTENTS = [
  {
    id: 'augment-decisions',
    label: 'Augmenting Decision-Making',
    description: 'AI helps humans make better and faster decisions',
  },
  {
    id: 'automate-routine',
    label: 'Automating Routine Execution',
    description: 'AI takes over repetitive, rule-based processes',
  },
  {
    id: 'enhance-monitoring',
    label: 'Enhancing Monitoring & Safety',
    description: 'AI provides oversight, anomaly detection, quality control',
  },
]

export const ROLES = [
  {
    id: 'supply-chain-manager',
    soc: '11-3071.04',
    title: 'Supply Chain Manager',
    category: 'operations',
    aiImpact: { score: +5.0, exposure: 1.0, tilt: 'augmentation' },
    skills: [
      { name: 'Supply Chain Management', importance: 0.15, salaryPremium: 20.7, demandGrowth: 6.6 },
      { name: 'Logistics', importance: 0.12, salaryPremium: 2.7, demandGrowth: 16.4 },
      { name: 'Inventory and Warehousing', importance: 0.08, salaryPremium: -9.6, demandGrowth: 3.1 },
      { name: 'Procurement', importance: 0.07, salaryPremium: 17.5, demandGrowth: -1.9 },
      { name: 'Supplier Management', importance: 0.07, salaryPremium: 24.9, demandGrowth: 13.6 },
      { name: 'Process Improvement', importance: 0.05, salaryPremium: 9.8, demandGrowth: 9.0 },
      { name: 'Business Analysis', importance: 0.05, salaryPremium: 18.6, demandGrowth: 6.6 },
    ],
    tasks: [
      { id: 'scm-1', text: 'Select transportation routes to maximize economy by combining shipments or consolidating warehousing and distribution.', z: -0.25, auto: 0.6, aug: 0.3, impacted: true },
      { id: 'scm-2', text: 'Diagram supply chain models to help facilitate discussions with customers.', z: -0.30, auto: 0.6, aug: 0.2, impacted: true },
      { id: 'scm-3', text: 'Negotiate prices and terms with suppliers, vendors, or freight forwarders.', z: 0.25, auto: 0.1, aug: 0.4, impacted: true },
      { id: 'scm-4', text: 'Meet with suppliers to discuss performance metrics, to provide performance feedback, or to discuss production forecasts or changes.', z: 0.20, auto: 0.1, aug: 0.3, impacted: true },
      { id: 'scm-5', text: 'Document physical supply chain processes, such as workflows, cycle times, position responsibilities, or system flows.', z: -0.30, auto: 0.6, aug: 0.2, impacted: true },
      { id: 'scm-6', text: 'Develop or implement procedures or systems to evaluate or select suppliers.', z: 0.05, auto: 0.3, aug: 0.4, impacted: true },
      { id: 'scm-7', text: 'Design or implement plant warehousing strategies for production materials or finished products.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-8', text: 'Confer with supply chain planners to forecast demand or create supply plans that ensure availability of materials or products.', z: 0.25, auto: 0.2, aug: 0.5, impacted: true },
      { id: 'scm-9', text: 'Define performance metrics for measurement, comparison, or evaluation of supply chain factors, such as product cost or quality.', z: 0.10, auto: 0.3, aug: 0.4, impacted: true },
      { id: 'scm-10', text: 'Analyze inventories to determine how to increase inventory turns, reduce waste, or optimize customer service.', z: 0.10, auto: 0.5, aug: 0.6, impacted: true },
      { id: 'scm-11', text: 'Analyze information about supplier performance or procurement program success.', z: 0.05, auto: 0.5, aug: 0.5, impacted: true },
      { id: 'scm-12', text: 'Participate in the coordination of engineering changes, product line extensions, or new product launches to ensure orderly and timely transitions in material or production flow.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-13', text: 'Develop procedures for coordination of supply chain management with other functional areas, such as sales, marketing, finance, production, or quality assurance.', z: 0.10, auto: 0.2, aug: 0.3, impacted: true },
      { id: 'scm-14', text: 'Design or implement supply chains that support business strategies adapted to changing market conditions, new business opportunities, or cost reduction strategies.', z: 0.30, auto: 0.3, aug: 0.6, impacted: true },
      { id: 'scm-15', text: 'Conduct or oversee the conduct of life cycle analyses to determine the environmental impacts of products, processes, or systems.', z: 0.10, auto: 0.4, aug: 0.5, impacted: true },
      { id: 'scm-16', text: 'Design or implement supply chains that support environmental policies.', z: 0.20, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-17', text: 'Design, implement, or oversee product take back or reverse logistics programs to ensure products are recycled, reused, or responsibly disposed.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-18', text: 'Evaluate and select information or other technology solutions to improve tracking and reporting of materials or products distribution, storage, or inventory.', z: 0.20, auto: 0.2, aug: 0.5, impacted: true },
      { id: 'scm-19', text: 'Identify opportunities to reuse or recycle materials to minimize consumption of new materials, minimize waste, or to convert wastes to by-products.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-20', text: 'Investigate or review the carbon footprints and environmental performance records of current or potential storage and distribution service providers.', z: -0.05, auto: 0.5, aug: 0.4, impacted: true },
      { id: 'scm-21', text: 'Locate or select biodegradable, non-toxic, or other environmentally friendly raw materials for manufacturing processes.', z: 0.10, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-22', text: 'Review or update supply chain practices in accordance with new or changing environmental policies, standards, regulations, or laws.', z: 0.10, auto: 0.3, aug: 0.4, impacted: true },
      { id: 'scm-23', text: 'Determine appropriate equipment and staffing levels to load, unload, move, or store materials.', z: 0.00, auto: 0.5, aug: 0.5, impacted: true },
      { id: 'scm-24', text: 'Manage activities related to strategic or tactical purchasing, material requirements planning, controlling inventory, warehousing, or receiving.', z: 0.10, auto: 0.4, aug: 0.5, impacted: true },
      { id: 'scm-25', text: 'Implement new or improved supply chain processes to improve efficiency or performance.', z: 0.20, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'scm-26', text: 'Monitor suppliers\u2019 activities to assess performance in meeting quality or delivery requirements.', z: -0.10, auto: 0.5, aug: 0.4, impacted: true },
      { id: 'scm-27', text: 'Monitor forecasts and quotas to identify changes and predict effects on supply chain activities.', z: 0.05, auto: 0.5, aug: 0.5, impacted: true },
      { id: 'scm-28', text: 'Identify or qualify new suppliers in collaboration with other departments, such as procurement, engineering, or quality assurance.', z: 0.10, auto: 0.3, aug: 0.4, impacted: true },
      { id: 'scm-29', text: 'Forecast material costs or develop standard cost lists.', z: -0.20, auto: 0.6, aug: 0.3, impacted: true },
      { id: 'scm-30', text: 'Appraise vendor manufacturing capabilities through on-site observations or other measurements.', z: 0.20, auto: 0.1, aug: 0.3, impacted: true },
    ],
  },
  {
    id: 'hr-specialist',
    soc: '13-1071.00',
    title: 'Human Resources Specialist',
    category: 'business',
    aiImpact: { score: -2.4, exposure: 0.85, tilt: 'automation' },
    skills: [
      { name: 'Recruitment', importance: 0.21, salaryPremium: 7.7, demandGrowth: 14.6 },
      { name: 'Human Resources Software', importance: 0.20, salaryPremium: -1.4, demandGrowth: 7.1 },
      { name: 'HR Management and Planning', importance: 0.07, salaryPremium: 15.6, demandGrowth: 16.0 },
      { name: 'Employee Relations', importance: 0.07, salaryPremium: 6.4, demandGrowth: 2.4 },
      { name: 'Payroll', importance: 0.05, salaryPremium: -14.7, demandGrowth: 14.9 },
    ],
    tasks: [
      { id: 'hr-1', text: 'Address employee relations issues, such as harassment allegations, work complaints, or other employee concerns.', z: 0.25, auto: 0.1, aug: 0.4, impacted: true },
      { id: 'hr-2', text: 'Analyze employment-related data and prepare required reports.', z: -0.05, auto: 0.6, aug: 0.5, impacted: true },
      { id: 'hr-3', text: 'Conduct exit interviews and ensure that necessary employment termination paperwork is completed.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'hr-4', text: 'Conduct reference or background checks on job applicants.', z: -0.30, auto: 0.6, aug: 0.2, impacted: true },
      { id: 'hr-5', text: 'Confer with management to develop or implement personnel policies or procedures.', z: 0.30, auto: 0.1, aug: 0.5, impacted: true },
      { id: 'hr-6', text: 'Contact job applicants to inform them of the status of their applications.', z: -0.50, auto: 0.7, aug: 0.1, impacted: true },
      { id: 'hr-7', text: 'Develop or implement recruiting strategies to meet current or anticipated staffing needs.', z: 0.30, auto: 0.2, aug: 0.6, impacted: true },
      { id: 'hr-8', text: 'Hire employees and process hiring-related paperwork.', z: -0.15, auto: 0.5, aug: 0.3, impacted: true },
      { id: 'hr-9', text: 'Inform job applicants of details such as duties and responsibilities, compensation, benefits, schedules, working conditions, or promotion opportunities.', z: -0.05, auto: 0.3, aug: 0.2, impacted: true },
      { id: 'hr-10', text: 'Interpret and explain human resources policies, procedures, laws, standards, or regulations.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'hr-11', text: 'Interview job applicants to obtain information on work history, training, education, or job skills.', z: 0.20, auto: 0.2, aug: 0.4, impacted: true },
      { id: 'hr-12', text: 'Maintain and update human resources documents, such as organizational charts, employee handbooks or directories, or performance evaluation forms.', z: -0.25, auto: 0.5, aug: 0.2, impacted: true },
      { id: 'hr-13', text: 'Maintain current knowledge of Equal Employment Opportunity (EEO) and affirmative action guidelines and laws, such as the Americans with Disabilities Act (ADA).', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'hr-14', text: 'Perform searches for qualified job candidates, using sources such as computer databases, networking, Internet recruiting resources, media advertisements, job fairs, recruiting firms, or employee referrals.', z: -0.15, auto: 0.6, aug: 0.4, impacted: true },
      { id: 'hr-15', text: 'Prepare or maintain employment records related to events, such as hiring, termination, leaves, transfers, or promotions, using human resources management system software.', z: -0.45, auto: 0.6, aug: 0.1, impacted: true },
      { id: 'hr-16', text: 'Provide management with information or training related to interviewing, performance appraisals, counseling techniques, or documentation of performance issues.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'hr-17', text: 'Review employment applications and job orders to match applicants with job requirements.', z: -0.20, auto: 0.6, aug: 0.3, impacted: true },
      { id: 'hr-18', text: 'Schedule or administer skill, intelligence, psychological, or drug tests for current or prospective employees.', z: -0.35, auto: 0.5, aug: 0.1, impacted: true },
      { id: 'hr-19', text: 'Schedule or conduct new employee orientations.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'hr-20', text: 'Select qualified job applicants or refer them to managers, making hiring recommendations when appropriate.', z: 0.15, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'hr-21', text: 'Advise management on organizing, preparing, or implementing recruiting or retention programs.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'hr-22', text: 'Coordinate with outside staffing agencies to secure temporary employees, based on departmental needs.', z: -0.10, auto: 0.3, aug: 0.2, impacted: true },
      { id: 'hr-23', text: 'Evaluate recruitment or selection criteria to ensure conformance to professional, statistical, or testing standards, recommending revisions, as needed.', z: 0.25, auto: 0.3, aug: 0.6, impacted: true },
      { id: 'hr-24', text: 'Evaluate selection or testing techniques by conducting research or follow-up activities and conferring with management or supervisory personnel.', z: 0.20, auto: 0.3, aug: 0.5, impacted: true },
      { id: 'hr-25', text: 'Review and evaluate applicant qualifications or eligibility for specified licensing, according to established guidelines and designated licensing codes.', z: -0.15, auto: 0.5, aug: 0.3, impacted: true },
      { id: 'hr-26', text: 'Administer employee benefit plans.', z: -0.05, auto: 0.4, aug: 0.3, impacted: true },
    ],
  },
  {
    id: 'admin-assistant',
    soc: '43-6014.00',
    title: 'Administrative Assistant',
    category: 'admin',
    aiImpact: { score: -11.1, exposure: 0.68, tilt: 'automation' },
    skills: [
      { name: 'Office Management', importance: 0.09, salaryPremium: -4.5, demandGrowth: -3.3 },
      { name: 'Administrative Support', importance: 0.08, salaryPremium: -4.8, demandGrowth: 1.4 },
      { name: 'Document Management', importance: 0.05, salaryPremium: -4.9, demandGrowth: 8.0 },
    ],
    tasks: [
      { id: 'aa-1', text: 'Use computers for various applications, such as database management or word processing.', z: -0.10, auto: 0.4, aug: 0.3, impacted: true },
      { id: 'aa-2', text: 'Create, maintain, and enter information into databases.', z: -0.50, auto: 0.7, aug: 0.1, impacted: true },
      { id: 'aa-3', text: 'Set up and manage paper or electronic filing systems, recording information, updating paperwork, or maintaining documents, such as attendance records, correspondence, or other material.', z: -0.25, auto: 0.5, aug: 0.2, impacted: true },
      { id: 'aa-4', text: 'Operate office equipment, such as fax machines, copiers, or phone systems and arrange for repairs when equipment malfunctions.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-5', text: 'Compose, type, and distribute meeting notes, routine correspondence, or reports, such as presentations or expense, statistical, or monthly reports.', z: -0.45, auto: 0.7, aug: 0.2, impacted: true },
      { id: 'aa-6', text: 'Perform payroll functions, such as maintaining timekeeping information and processing and submitting payroll.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-7', text: 'Collect and deposit money into accounts, disburse funds from cash accounts to pay bills or invoices, keep records of collections and disbursements, and ensure accounts are balanced.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-8', text: 'Coordinate conferences, meetings, or special events, such as luncheons or graduation ceremonies.', z: -0.10, auto: 0.3, aug: 0.2, impacted: true },
      { id: 'aa-9', text: 'Develop or maintain internal or external company Web sites.', z: -0.15, auto: 0.6, aug: 0.4, impacted: true },
      { id: 'aa-10', text: 'Train and assist staff with computer usage.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-11', text: 'Prepare conference or event materials, such as flyers or invitations.', z: -0.40, auto: 0.7, aug: 0.2, impacted: true },
      { id: 'aa-12', text: 'Answer telephones and give information to callers, take messages, or transfer calls to appropriate individuals.', z: -0.40, auto: 0.6, aug: 0.1, impacted: true },
      { id: 'aa-13', text: 'Greet visitors or callers and handle their inquiries or direct them to the appropriate persons according to their needs.', z: -0.25, auto: 0.4, aug: 0.1, impacted: true },
      { id: 'aa-14', text: 'Locate and attach appropriate files to incoming correspondence requiring replies.', z: -0.35, auto: 0.6, aug: 0.2, impacted: true },
      { id: 'aa-15', text: 'Open, read, route, and distribute incoming mail or other materials and answer routine letters.', z: -0.35, auto: 0.6, aug: 0.2, impacted: true },
      { id: 'aa-16', text: 'Complete forms in accordance with company procedures.', z: -0.45, auto: 0.6, aug: 0.1, impacted: true },
      { id: 'aa-17', text: 'Make copies of correspondence or other printed material.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-18', text: 'Review work done by others to check for correct spelling and grammar, ensure that company format policies are followed, and recommend revisions.', z: -0.45, auto: 0.7, aug: 0.2, impacted: true },
      { id: 'aa-19', text: 'Learn to operate new office technologies as they are developed and implemented.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-20', text: 'Maintain scheduling and event calendars.', z: -0.55, auto: 0.7, aug: 0.1, impacted: true },
      { id: 'aa-21', text: 'Schedule and confirm appointments for clients, customers, or supervisors.', z: -0.60, auto: 0.7, aug: 0.1, impacted: true },
      { id: 'aa-22', text: 'Manage projects or contribute to committee or team work.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-23', text: 'Mail newsletters, promotional material, or other information.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-24', text: 'Order and dispense supplies.', z: -0.25, auto: 0.5, aug: 0.2, impacted: true },
      { id: 'aa-25', text: 'Conduct searches to find needed information, using such sources as the Internet.', z: -0.20, auto: 0.6, aug: 0.3, impacted: true },
      { id: 'aa-26', text: 'Provide services to customers, such as order placement or account information.', z: -0.30, auto: 0.5, aug: 0.2, impacted: true },
      { id: 'aa-27', text: 'Prepare and mail checks.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
      { id: 'aa-28', text: 'Establish work procedures or schedules and keep track of the daily work of clerical staff.', z: -0.20, auto: 0.4, aug: 0.2, impacted: true },
      { id: 'aa-29', text: 'Arrange conference, meeting, or travel reservations for office personnel.', z: -0.50, auto: 0.7, aug: 0.1, impacted: true },
      { id: 'aa-30', text: 'Operate electronic mail systems and coordinate the flow of information, internally or with other organizations.', z: -0.25, auto: 0.5, aug: 0.2, impacted: true },
      { id: 'aa-31', text: 'Supervise other clerical staff and provide training and orientation to new staff.', z: 0.00, auto: 0.0, aug: 0.0, impacted: false },
    ],
  },
]

// Structural tags definitions
export const STRUCTURAL_TAGS = [
  {
    id: 'developmental',
    label: 'Developmental',
    description: 'Crucial for people to learn without AI for career progression or to understand the firm. Automating may save time now but erodes the pipeline of people who understand the work deeply enough to advance.',
  },
  {
    id: 'atrophy-risk',
    label: 'Atrophy Risk',
    description: 'Requires a skill that degrades without practice. Research shows: automation complacency (users trust AI even when wrong), skill decay (pilots study), and the "falling asleep at the wheel" effect (better AI \u2192 lazier human oversight).',
  },
  {
    id: 'relationship-critical',
    label: 'Relationship-Critical',
    description: 'Derives value from the fact that a human is performing it \u2014 because of client trust, leadership presence, or a therapeutic/advisory relationship. Automating may be feasible but destroys the relational value.',
  },
  {
    id: 'bottleneck',
    label: 'Bottleneck',
    description: 'Sets the ceiling for all other tasks. If non-automatable and sits in the middle of an otherwise automatable workflow, it limits the gains from automating everything else.',
  },
]

// Core question definitions for Step 5
export const CORE_QUESTIONS = [
  {
    id: 'codifiability',
    label: 'Codifiability',
    question: 'How clearly can the rules or decision criteria for this task be defined?',
    description: 'Tasks whose rules can be clearly specified are candidates for automation. Tasks relying on tacit knowledge resist automation.',
    options: [
      { value: 'full', label: 'Fully codifiable', description: 'Rules and criteria can be clearly specified' },
      { value: 'partial', label: 'Partially codifiable', description: 'Some aspects can be specified, others rely on judgment' },
      { value: 'not', label: 'Not codifiable', description: 'Relies on tacit knowledge or intuition' },
    ],
  },
  {
    id: 'verifiability',
    label: 'Verifiability',
    question: 'Can the output of this task be easily tested or validated?',
    description: 'Even if AI can produce output, if no one can tell whether the output is good, automation is dangerous.',
    options: [
      { value: 'yes', label: 'Yes \u2014 clear test exists', description: 'Output can be checked against a spec or standard' },
      { value: 'partial', label: 'Partially \u2014 judgment-based', description: 'Requires expert judgment to evaluate quality' },
      { value: 'no', label: 'No \u2014 hard to verify', description: 'No reliable, repeatable test for output quality' },
    ],
  },
  {
    id: 'stakes',
    label: 'Stakes of Mistakes',
    question: 'How costly are errors, and how reversible are decisions?',
    description: 'High stakes push toward human oversight even when AI is technically capable.',
    options: [
      { value: 'low', label: 'Low stakes', description: 'Errors are cheap and easily reversible' },
      { value: 'moderate', label: 'Moderate stakes', description: 'Errors matter but are manageable' },
      { value: 'high', label: 'High stakes', description: 'Errors are costly or potentially irreversible' },
    ],
  },
  {
    id: 'accountability',
    label: 'Human Accountability',
    question: 'Does a human need to own the final outcome of this task?',
    description: 'Legal liability, regulatory compliance, or organizational trust may require human sign-off regardless of AI capability.',
    options: [
      { value: 'no', label: 'No requirement', description: 'No specific human needs to own the outcome' },
      { value: 'yes', label: 'Yes \u2014 accountability required', description: 'A human must sign off for legal, regulatory, or org reasons' },
    ],
  },
  {
    id: 'expertise',
    label: 'Expertise Level',
    question: 'Is this one of the more expert/skilled tasks in the role, or more routine?',
    description: 'Automating routine tasks raises the expertise bar (role gets harder). Automating expert tasks lowers it (role gets easier, more people can do it).',
    options: [
      { value: 'routine', label: 'Routine', description: 'Standard, repetitive, lower-skill' },
      { value: 'moderate', label: 'Moderate', description: 'Requires experience but not deep expertise' },
      { value: 'expert', label: 'Expert', description: 'Requires deep expertise, judgment, or rare knowledge' },
    ],
  },
]

// Routing logic: given answers, determine the bucket
export function routeTask(answers, tags) {
  const { codifiability, verifiability, stakes, accountability } = answers
  const isDevelopmental = tags?.includes('developmental')
  const isAtrophyRisk = tags?.includes('atrophy-risk')

  // Not codifiable -> Human-Led
  if (codifiability === 'not') return 'human-led'

  // Partially codifiable -> floor of HITL
  if (codifiability === 'partial') {
    if (isDevelopmental) return 'human-led'
    return 'human-in-the-loop'
  }

  // Fully codifiable
  if (verifiability === 'no' && stakes === 'high') return 'human-led'
  if (verifiability === 'no') return 'human-in-the-loop'
  if (accountability === 'yes') return 'human-in-the-loop'
  if (stakes === 'high') return 'human-in-the-loop'

  // Modifiers
  if (isDevelopmental) {
    if (stakes === 'moderate') return 'human-in-the-loop'
    return 'human-on-the-loop'
  }

  if (stakes === 'moderate') return 'human-on-the-loop'

  // Low stakes, verifiable, no accountability
  if (isAtrophyRisk) return 'human-on-the-loop'

  return 'fully-automated'
}

export const BUCKETS = {
  'human-led': {
    label: 'Human-Led',
    color: '#024879',
    description: 'AI plays no significant role; the task remains fundamentally human.',
  },
  'human-in-the-loop': {
    label: 'Human-in-the-Loop',
    color: '#42769B',
    description: 'AI assists or drafts, but a human actively participates and validates before output is final.',
  },
  'human-on-the-loop': {
    label: 'Human-on-the-Loop',
    color: '#E0712A',
    description: 'AI executes autonomously, but a human monitors and can intervene on exceptions.',
  },
  'fully-automated': {
    label: 'Fully Automated',
    color: '#C12035',
    description: 'AI handles end-to-end with no routine human involvement.',
  },
}
