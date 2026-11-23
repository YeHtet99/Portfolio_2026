import { test, expect } from '@playwright/test'

test('one-page portfolio scrolls through anchored sections', async ({ page }) => {
  await page.goto('/')
  await page.locator('.boot-sequence').waitFor({ state: 'hidden' })
  await expect(page.getByText('Building clarity', { exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Experience', exact: true }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await expect(page).toHaveURL(/#experience$/)
  await page.getByRole('button', { name: 'View Details' }).nth(1).click()
  await expect(page.getByRole('dialog', { name: /NXMap/i })).toBeVisible()
  await expect(page.getByText(/Excel Import\/Export features/)).toBeVisible()
  await page.getByRole('button', { name: 'Close project details' }).click()
  await page.getByRole('button', { name: 'Toggle command console' }).click()
  await expect(page.getByRole('dialog', { name: 'Portfolio command console' })).toBeVisible()
})

test('old paths redirect to the single portfolio page', async ({ page }) => {
  await page.goto('/projects/nxstart')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByText('Building clarity', { exact: true })).toBeVisible()
})
