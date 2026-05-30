from playwright.sync_api import sync_playwright
import os
import time

def run_verification(page):
    # Verification of Landing Page
    print("Verifying Landing Page...")
    page.goto("http://localhost:3000/whatcanibe")
    page.wait_for_timeout(2000)

    # Hero Section
    page.screenshot(path="/home/jules/verification/screenshots/landing_hero.png")
    print("Screenshot taken: landing_hero.png")

    # Scroll to About Us
    page.evaluate("window.scrollTo(0, 1000)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/landing_about.png")
    print("Screenshot taken: landing_about.png")

    # Scroll to Choose Your Dominion
    page.evaluate("window.scrollTo(0, 2500)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/landing_dominion.png")
    print("Screenshot taken: landing_dominion.png")

    # Scroll to Workflow
    page.evaluate("window.scrollTo(0, 4500)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/landing_workflow.png")
    print("Screenshot taken: landing_workflow.png")

    # Verification of Careers Page
    print("Verifying Careers Page...")
    page.goto("http://localhost:3000/whatcanibe/careers")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/careers_hero.png")
    print("Screenshot taken: careers_hero.png")

    # Scroll to Ecosystem Wheel
    page.evaluate("window.scrollTo(0, 1000)")
    page.wait_for_timeout(1000)

    # Interact with a cluster on the wheel
    try:
        # Wait for the wheel buttons
        page.wait_for_selector("button.group\/btn")
        buttons = page.query_selector_all("button.group\/btn")
        if buttons:
            buttons[0].click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/screenshots/careers_ecosystem_selected.png")
            print("Screenshot taken: careers_ecosystem_selected.png")
    except Exception as e:
        print(f"Could not interact with wheel: {e}")

    # Scroll to Cluster Intelligence
    page.evaluate("window.scrollTo(0, 2500)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/careers_clusters.png")
    print("Screenshot taken: careers_clusters.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
