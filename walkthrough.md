# Walkthrough - FlowSense AI (Smart Crowd Management System)

We have built and verified **FlowSense AI** — a complete, state-of-the-art intelligent crowd monitoring, virtual queuing, and safety prediction web application designed specifically for high-concourse public spaces in India (temples, train stations, metro hubs, festival grounds, and government offices).

---

## 📸 Completed Views & Verification Highlights

### 1. Public Landing Page Gateway
- **Live System Telemetry**: Dynamic counter for aggregate live headcount across India, active monitored spaces, AI safety index score (98.6%), and virtual queues processed today.
- **Live High-Density Watchlist**: Real-time ticker cards for top Indian locations (Tirupati Balaji Temple, Dadar Central Station, Rajiv Chowk Metro, Lalbaugcha Raja Festival, Passport Seva Kendra, Golden Temple Amritsar).
- **Core Technology Pillars**: Showcases AI Vision CCTV, Throttled Virtual Queues, 48-Hour AI Predictive Load Modeling, and Operator Emergency Dispatching.

![Home Landing Page](file:///C:/Users/subas/.gemini/antigravity-ide/brain/7bedfb48-a558-4f4d-b03c-8f1f26394cc6/home_page_load_1786373542884.png)

---

### 2. Citizen Public Portal & AI Forecast Modal
- **Browse & Search**: Filter locations by city (Mumbai, Delhi, Tirupati, Bengaluru, Amritsar, Kolkata), category, or live crowd status (Low, Moderate, High, Critical).
- **AI 24h Trend & Forecast**: Interactive Chart.js graph displaying historical 24h capacity % alongside 24h future AI load forecasts.
- **AI Recommendation Engine**: Highlights green optimal arrival windows (e.g. *"14:00 - 16:30 today (Predicted ~25% capacity)"*).
- **CCTV Sensor Preview**: Real-time simulated computer vision camera feed with detected person bounding boxes (`PERSON #124`, `DENSITY SURGE ZONE`).

![AI Forecast Modal](file:///C:/Users/subas/.gemini/antigravity-ide/brain/7bedfb48-a558-4f4d-b03c-8f1f26394cc6/tirupati_forecast_modal_1786373664242.png)

---

### 3. Virtual Queue & Digital Token Pass
- **Remote Queue Booking**: Select specific entrance counter/gate, visitor name, party size (1-10), and special assistance tags (Senior Citizen / Disability Priority).
- **Digital Pass**: Interactive token pass featuring:
  - Custom generated QR Code canvas (via QRious library).
  - Token ID (e.g., `TIRU-A-818`).
  - Real-time Position counter in line (`#6`) with countdown updates.
  - Estimated wait time (`~18 mins`).
  - Celebration confetti animation upon ticket issue.
  - Audio chime notifications when queue position advances.

![Digital Token Pass](file:///C:/Users/subas/.gemini/antigravity-ide/brain/7bedfb48-a558-4f4d-b03c-8f1f26394cc6/generated_token_ticket_1786373754625.png)

---

### 4. Admin Command Center & CCTV Control Room
- **Operator Ops Dashboard**: Global metric cards, critical incidents console with "Dispatch Security" and "Broadcast Announcement" controls.
- **CCTV Vision Control Grid**: 4-camera live array with active/inactive stream toggles and global AI detection mode switcher (Density Heatmap, Person Counter, Stampede Warning).
- **Venue Fleet Directory**: Add new public venue form with capacity, image URL, and safety threshold controls.

![Admin Dashboard](file:///C:/Users/subas/.gemini/antigravity-ide/brain/7bedfb48-a558-4f4d-b03c-8f1f26394cc6/admin_dashboard_load_1786373785339.png)

---

### 5. Gate Entrance QR Check-In Scanner
- **Kiosk Mode**: Scanner interface for gate security guards to scan citizen QR code tokens or enter Token ID manually.
- **Live Check-in**: Instantly grants entry, updates physical venue capacity live, and logs entry event.

![Gate Scanner](file:///C:/Users/subas/.gemini/antigravity-ide/brain/7bedfb48-a558-4f4d-b03c-8f1f26394cc6/manual_verify_success_1786373884308.png)

---

### 6. Google Gemini AI API Connection & Live Features
- **API Key Configuration Modal**: Added a dedicated API Key connection modal accessible from the top navigation bar (`Connect API Key` button).
- **Free Key Retrieval Instructions**: Step-by-step guidance to get a free API Key from [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey).
- **Persistent Key Storage**: Automatically saves the API key to `localStorage` and `config.js` with instant key verification testing.
- **Live Gemini AI Features Connected**:
  - **Live Crowd Diagnostic Scan**: Generates real-time AI risk analysis and operator intervention protocols for any public venue in `LocationDetailModal.js`.
  - **Gemini Vision Intelligence**: Performs Optical Flow and Density Vector scans on live CCTV streams in `CameraFeedGrid.js`.
  - **Interactive Gemini AI Assistant**: Powered by Google Gemini AI, allowing citizens and admins to query live crowd safety recommendations.

![Gemini API Key Modal](file:///C:/Users/subas/.gemini/antigravity-ide/brain/e26660e1-3e81-425d-a839-c8654160512a/gemini_api_key_modal_1786432306310.png)

---

## 🛠️ Verification & Test Results
- **Hosted Web Application**: [https://flowsense.subasish.in/](https://flowsense.subasish.in/)
- **Local Web Server**: Running on `http://localhost:5173`.
- **Real-Time Simulation Engine**: Fluctuates crowd levels every 3.5 seconds, auto-advances active queue positions, and updates venue status between Low, Moderate, High, and Critical.
- **All Interactive Flows Verified**: Tested landing page, location filters, AI forecast chart, virtual token generation, admin CCTV feeds, gate scanner check-in, API key modal connection, and Gemini AI Assistant.
