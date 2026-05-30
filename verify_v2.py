from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    # Set a large viewport
    page.set_viewport_size({"width": 1440, "height": 900})

    print("Verifying Landing Page...")
    page.goto("http://localhost:3000/whatcanibe", wait_until="networkidle")
    page.wait_for_timeout(5000) # Wait for animations

    # Hero Section
    page.screenshot(path="/home/jules/verification/screenshots/v2_landing_hero.png")
    print("Screenshot taken: v2_landing_hero.png")

    # About Us Section
    about_section = page.locator("#about")
    if about_section.is_visible():
        about_section.scroll_into_view_if_needed()
        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/screenshots/v2_landing_about.png")
        print("Screenshot taken: v2_landing_about.png")

    # Career Categories (Dominion)
    dominion_section = page.get_by_text("Choose Your Dominion")
    if dominion_section.is_visible():
        dominion_section.scroll_into_view_if_needed()
        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/screenshots/v2_landing_dominion.png")
        print("Screenshot taken: v2_landing_dominion.png")

    # Workflow Section
    workflow_section = page.locator("#workflow")
    if workflow_section.is_visible():
        workflow_section.scroll_into_view_if_needed()
        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/screenshots/v2_landing_workflow.png")
        print("Screenshot taken: v2_landing_workflow.png")

    # Careers Page
    print("Verifying Careers Page...")
    page.goto("http://localhost:3000/whatcanibe/careers", wait_until="networkidle")
    page.wait_for_timeout(5000)
    page.screenshot(path="/home/jules/verification/screenshots/v2_careers_hero.png")
    print("Screenshot taken: v2_careers_hero.png")

    # Ecosystem Wheel
    ecosystem_section = page.locator("#ecosystem")
    if ecosystem_section.is_visible():
        ecosystem_section.scroll_into_view_if_needed()
        page.wait_for_timeout(3000)
        page.screenshot(path="/home/jules/verification/screenshots/v2_careers_ecosystem.png")
        print("Screenshot taken: v2_careers_ecosystem.png")

        # Click a cluster
        clusters = page.locator("button.group\/btn")
        if clusters.count() > 0:
            clusters.nth(0).click()
            page.wait_for_timeout(2000)
            page.screenshot(path="/home/jules/verification/screenshots/v2_careers_ecosystem_selected.png")
            print("Screenshot taken: v2_careers_ecosystem_selected.png")

    # Cluster Intelligence
    clusters_section = page.get_by_text("Cluster Intelligence")
    if clusters_section.is_visible():
        clusters_section.scroll_into_view_if_needed()
        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/screenshots/v2_careers_cluster_intelligence.png")
        print("Screenshot taken: v2_careers_cluster_intelligence.png")

    # Verify Login Page (Backend/Auth Protection check)
    print("Verifying Login Page load...")
    page.goto("http://localhost:3000/whatcanibe/login")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/v2_login_page.png")
    print("Screenshot taken: v2_login_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1440, "height": 900}
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
