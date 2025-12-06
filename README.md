<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run our gemini card creater app locally.

View your app in AI Studio: https://ai.studio/apps/drive/16T7bytIvK0XUc2iEgmpLgXOLeTFELxrG

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that builds the Vite app and publishes the `dist/` output to GitHub Pages.

1. In your GitHub repository settings, enable GitHub Pages with the **Source** set to **GitHub Actions**.
2. Push to the `work` branch (or trigger the workflow manually) to build and deploy to `https://potamv01.github.io/VenkatPotamsetti/`.
