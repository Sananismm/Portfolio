export type VisualKind = "portrait" | "vision" | "lora" | "ecg" | "speech" | "iq" | "wave";

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  year?: string;
  description: string;
  tags: string[];
  visual: VisualKind;
  role: string;
  overview: string;
  problem: string;
  approach: string[];
  methodology: string;
  results: { value: string; label: string }[];
  resultNote: string;
  limitations: string;
};

export const profile = {
  name: "Muhammad Sanan Khan",
  email: "sanankhan4043@gmail.com",
  github: "https://github.com/Sananismm",
  linkedin: "https://www.linkedin.com/in/snaan",
  // Set availability to true only when accepting new collaborations.
  availableForCollaboration: false,
  availabilityLabel: "EXPLORING SIGNALS & SYSTEMS",
  location: "ISLAMABAD, PK / 33.68° N",
  education: "B.E. Electrical Engineering, NUST",
  educationDates: "2023 — EXPECTED 2027",
};

export const projects: Project[] = [
  {
    slug: "driver-drowsiness", number: "01", title: "Real-Time Driver Drowsiness Monitoring", shortTitle: "Reading the signs\nbefore the silence.", category: "COMPUTER VISION / EDGE AI", year: "2026", visual: "vision",
    description: "From facial landmarks to driver alerts. A real-time vision system targeting the NVIDIA Jetson Orin Nano.",
    tags: ["OPENCV", "JETSON ORIN NANO", "EMBEDDED AI"], role: "Project Lead & Embedded Systems Lead",
    overview: "A six-subgroup computer vision project bringing camera acquisition, behavioral analysis, classification, and driver alerts into one embedded system. I led the overall project and the SG-6 embedded deployment and integration workstream.",
    problem: "Eye state alone does not capture every sign of drowsiness. The system needs to combine multiple visual cues over time while keeping independently developed modules compatible with an embedded execution pipeline.",
    approach: ["Defined the architecture and interfaces connecting face detection, landmarks, eye state, blinks, and yawning cues.", "Coordinated six subgroups around module deliverables, interface specifications, and progressive integration.", "Led the embedded workflow targeting Jetson Orin Nano 8GB, including camera acquisition and module interoperability."],
    methodology: "The architecture combines frame-level facial cues with temporal behavior analysis, followed by drowsiness classification and driver alerts. Integration proceeds across module boundaries toward end-to-end execution on the target hardware.",
    results: [{value: "6", label: "coordinated subgroups"}, {value: "8 GB", label: "Jetson target memory"}],
    resultNote: "The CV documents architecture, coordination, and embedded integration work. It does not report measured accuracy, inference latency, or field validation.",
    limitations: "The embedded deployment is described as a target workstream. No road-tested safety performance or production deployment is claimed. The visual on this page is an illustration of landmark geometry, not a recorded inference output.",
  },
  {
    slug: "lora-doppler", number: "02", title: "LoRa Doppler Classification", shortTitle: "Finding motion\nin the radio noise.", category: "WIRELESS / DEEP LEARNING", year: "2026", visual: "lora",
    description: "A leakage-aware raw-I/Q pipeline exploring six controlled synthetic Doppler classes over measured LoRa frames.",
    tags: ["PYTORCH", "RAW I/Q", "1D CNN"], role: "Research Intern · Smart Agritech Lab",
    overview: "A synthetic feasibility study built on 10,000 measured stationary LoRa frames. The work combines controlled Doppler synthesis, careful partitioning, baseline comparisons, calibration, and reproducible experiment tracking.",
    problem: "Augmented versions of the same source frame can leak between training and test sets, overstating model performance. A useful feasibility study needs source-aware separation and explicit limits on what synthetic results establish.",
    approach: ["Constructed six controlled synthetic Doppler classes from measured stationary raw-I/Q frames.", "Used frame-disjoint dataset partitions to keep related source frames from crossing split boundaries.", "Designed a 145,222-parameter residual 1D CNN and compared baseline models.", "Tracked calibration, robustness tests, and repeated evaluations across random seeds."],
    methodology: "The evaluation uses measured stationary source data with controlled synthetic Doppler transformations. Results are reported separately for one seed and the mean of four completed seeds; they are synthetic feasibility results.",
    results: [{value: "98.9%", label: "mean synthetic accuracy · 4 seeds"}, {value: "10,000", label: "measured source frames"}, {value: "145,222", label: "CNN parameters"}],
    resultNote: "One evaluation seed achieved 98.8% synthetic test accuracy. The four-seed mean was 98.9%. Manuscript in preparation; not a published result.",
    limitations: "Synthetic Doppler classification does not establish performance on measured moving transmitters, unseen propagation environments, or field deployment. The spectrogram-inspired artwork is procedural and is not experimental data.",
  },
  {
    slug: "ecg-monitoring", number: "03", title: "ECG Signal Processing & Monitoring", shortTitle: "Making sense\nof every beat.", category: "BIOMEDICAL DSP / EMBEDDED", year: "2026", visual: "ecg",
    description: "Real-time ECG acquisition, denoising, and waveform analysis across an ESP32, AD8232, and MATLAB dashboard.",
    tags: ["MATLAB", "ESP32", "AD8232", "DSP"], role: "Technical project",
    overview: "A hardware-integrated ECG acquisition and monitoring system with live visualization, R-peak detection, BPM estimation, HRV analysis using RMSSD and SDNN, and P-Q-R-S-T waveform inspection.",
    problem: "Physiological signals are vulnerable to power-line interference, baseline drift, and motion artifacts. Filtering must suppress noise while preserving timing and waveform morphology for analysis.",
    approach: ["Integrated ESP32 acquisition and the AD8232 analog front-end with a MATLAB monitoring dashboard.", "Implemented FFT analysis, Butterworth high-pass and low-pass filters, a 50 Hz notch, and FIR alternatives.", "Developed STFT-based motion-artifact detection and compared interpolation, median replacement, hybrid smoothing, and wavelet denoising.", "Investigated causal versus zero-phase filtering and inter-lead timing consistency using MIT-BIH and PTB datasets."],
    methodology: "Evaluated denoising using SNR improvement, frequency response, phase distortion, and group delay. Combined a live hardware workflow with reference-dataset investigations to inspect timing and morphology effects.",
    results: [{value: "P–Q–R–S–T", label: "waveform inspection"}, {value: "RMSSD / SDNN", label: "HRV measures implemented"}],
    resultNote: "The documented outputs include live acquisition, visualization, peak detection, BPM and HRV analysis. The CV does not specify numeric denoising improvements or clinical validation.",
    limitations: "This is an engineering monitoring and analysis project, not a validated diagnostic device. The animated waveform is an artistic illustration, not a patient recording.",
  },
  {
    slug: "speech-emotion", number: "04", title: "Speech Emotion Recognition", shortTitle: "Listening beyond\nthe words.", category: "AUDIO DSP / MACHINE LEARNING", visual: "speech",
    description: "An audio classification pipeline connecting MFCC features, classical models, and CNN-based real-time inference.",
    tags: ["PYTHON", "LIBROSA", "SCIKIT-LEARN", "CNN"], role: "Technical project",
    overview: "An audio-classification pipeline using MFCC and delta-MFCC features with classical machine-learning models, extended with a CNN classifier and a real-time inference interface.",
    problem: "Speech carries information in its changing spectral structure. A classification workflow needs to turn audio into usable representations and connect feature extraction with application-level inference.",
    approach: ["Extracted MFCC and delta-MFCC features to represent speech audio.", "Built classical classification workflows using Python, Librosa, and Scikit-learn.", "Extended the system with a CNN classifier and real-time inference interface."],
    methodology: "Connected audio feature extraction, classification, and application-level deployment in one inference workflow. Both conventional feature-based models and a CNN-based extension are documented in the CV.",
    results: [{value: "MFCC + Δ", label: "audio features"}, {value: "REAL-TIME", label: "inference interface implemented"}],
    resultNote: "No dataset, project year, numeric accuracy, or latency measurements are supplied in the CV, so none are asserted here.",
    limitations: "The documented work does not establish generalization across speakers, languages, or recording environments. The waveform artwork is generated, not a microphone stream or recorded experiment.",
  },
  {
    slug: "iq-streaming", number: "05", title: "ADRV9364 I/Q Streaming Testbed", shortTitle: "Every sample\naccounted for.", category: "SDR / STREAMING SYSTEMS", year: "2026", visual: "iq",
    description: "An instrumented raw-I/Q acquisition and TCP streaming testbed, built to locate the bottleneck instead of hiding it.",
    tags: ["ADRV9364-Z7020", "PYADI-IIO", "TCP", "PYTHON"], role: "Research Intern · Smart Agritech Lab",
    overview: "A continuous acquisition and streaming testbed on ADRV9364-Z7020, using pyadi-iio, concurrent producer–consumer processing, circular buffering, sequence-numbered framing, and source-to-host continuity instrumentation.",
    problem: "A stream can deliver every emitted application frame and still fail to sustain the source sample rate. Transport delivery must be distinguished from acquisition continuity, buffering behavior, and sustained throughput.",
    approach: ["Separated acquisition from transport with concurrent producer–consumer processing and circular buffering.", "Added sequence-numbered application framing and source-to-host continuity instrumentation.", "Reconstructed emitted frames at the host and measured network goodput against the required payload rate."],
    methodology: "Instrumented the path from acquisition to host reconstruction. Assessed emitted application-frame delivery separately from the throughput required for continuous 1 MS/s operation.",
    results: [{value: "5,946", label: "emitted frames reconstructed"}, {value: "24.35 M", label: "complex samples"}, {value: "100%", label: "emitted transport-frame delivery"}],
    resultNote: "Measured goodput of 11–13.5 Mbit/s was the primary bottleneck against the 32 Mbit/s payload requirement for continuous 1 MS/s streaming. Manuscript in preparation.",
    limitations: "100% delivery refers to emitted application frames; it does not imply lossless continuous 1 MS/s acquisition. Network throughput remained below the target payload rate. The paired traces are illustrative.",
  },
];

export const experience = [
  {period: "JUN — SEP 2026", organization: "Smart Agritech Lab", role: "Research Intern · Edge AI & Wireless Systems", location: "ISLAMABAD", description: "Measured I/Q acquisition, reproducible ML experiments, and instrumented SDR streaming. Built a leakage-aware LoRa study and investigated continuity from hardware source to host.", tags: "ADRV9364 · ADALM-PLUTO · PYTORCH · OPENAIRINTERFACE", visual: "iq" as VisualKind},
  {period: "JUN — OCT 2025", organization: "NECOP", role: "Embedded Systems & Tooling Developer Intern", location: "ISLAMABAD", description: "Developed backend tooling for the striVe embedded IDE: peripheral configuration, initialization-code generation, and microcontroller library workflows. Worked with RTL, Vivado simulation, and FPGA prototyping.", tags: "VERILOG / RTL · VIVADO · NEXYS A7 · NEXYS VIDEO", visual: "wave" as VisualKind},
  {period: "JUN — AUG 2024", organization: "Ufone", role: "Network Engineering & Cybersecurity Intern", location: "PESHAWAR", description: "Worked with telecom engineers on network operations, troubleshooting, infrastructure monitoring, and enterprise cybersecurity workflows.", tags: "TELECOMMUNICATIONS · NETWORK OPERATIONS", visual: "lora" as VisualKind},
];

export const disciplines = [
  { number: "01", title: "Computer vision\n& edge AI", description: "Perception that moves out of the notebook and onto the device.", tools: "OpenCV / facial landmarks / NVIDIA Jetson / CUDA", visual: "vision" as VisualKind },
  { number: "02", title: "Signal processing\n& machine learning", description: "Finding structure in physiological signals, speech, and time series.", tools: "MATLAB / PyTorch / Scikit-learn / FFT & STFT", visual: "ecg" as VisualKind },
  { number: "03", title: "Wireless systems\n& SDR", description: "Working with the signal itself, from raw I/Q to decoded packets.", tools: "ADALM-Pluto / ADRV9364 / pyadi-iio / LoRa", visual: "iq" as VisualKind },
  { number: "04", title: "Embedded systems\n& real-time computing", description: "Connecting software, hardware, and the constraints between them.", tools: "C / C++ / ESP32 / Embedded Linux / SystemVerilog", visual: "wave" as VisualKind },
];
