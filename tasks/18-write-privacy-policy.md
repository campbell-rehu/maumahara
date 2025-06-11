# Task 18: Write privacy policy if needed

## Priority: Low

## Description
Determine if a privacy policy is required and create one if necessary for App Store compliance.

## Privacy Assessment

### Data Collection
Does the app collect any:
- [ ] User accounts or profiles? NO
- [ ] Analytics or crash reports? CHECK
- [ ] Location data? NO
- [ ] Contact information? NO
- [ ] Device identifiers? CHECK
- [ ] Gameplay statistics? LOCAL ONLY

### Third-Party Services
- Expo Analytics (if enabled)
- Crash reporting (if enabled)
- No ads or external services

## Privacy Policy Requirements

If any data is collected:
1. What data is collected
2. How it's used
3. Who it's shared with
4. Data retention period
5. User rights
6. Contact information

## Minimal Policy Template
```
Maumahara Privacy Policy

Last updated: [Date]

Maumahara ("we" or "our") respects your privacy. 
This app:
- Does not collect personal information
- Does not require user accounts
- Stores game progress locally only
- May collect anonymous crash reports to improve the app

Contact: [email]
```

## App Store Privacy Labels
- Configure in App Store Connect
- Match privacy policy statements
- Be transparent about any collection

## Acceptance Criteria
- [ ] Privacy needs assessed
- [ ] Policy created if required
- [ ] Hosted at accessible URL
- [ ] App Store labels configured
- [ ] Policy linked in app (if needed)