# Te Reo Māori Animal Memory Game
## Product Requirements Document

**Version:** 1.0  
**Date:** June 2025  
**Status:** Draft

---

## Executive Summary

A culturally-focused memory game that teaches Te Reo Māori animal names through engaging gameplay. Players match English animal names with their Te Reo Māori translations while learning correct pronunciation and cultural context.

## Product Vision

**Mission:** A simple memory game that teaches Te Reo Māori animal names through beautiful illustrations.

**Primary Goal:** Successfully publish a polished, playable app on the App Store.

**Target Audience:** Everyone - families, children, adults, and educators interested in Te Reo Māori learning through enjoyable gameplay.

---

## User Personas

### Primary: Parents (Ages 25-45)
- **Motivation:** Finding quality educational apps for children, introducing Te Reo Māori to family
- **Pain Points:** Limited engaging Te Reo resources for kids, concerns about screen time quality
- **Goals:** Educational value, family bonding, cultural connection
- **App Usage:** Playing together with children, monitoring learning progress

### Secondary: Children (Ages 5-12)
- **Motivation:** Fun gameplay, colorful visuals, sense of achievement
- **Pain Points:** Difficulty with traditional learning methods, short attention spans
- **Goals:** Entertainment, mastery feeling, visual recognition
- **App Usage:** Independent play and guided play with parents

---

## Core Features

### MVP Features (React Native)

#### Game Mechanics
- **Grid Layouts:** Easy (2x3), Medium (4x4), Hard (4x5)
- **Image Matching:** Match identical animal illustrations, each card shows both Te Reo and English names
- **Visual Learning:** Primary focus on image recognition with text providing language reinforcement
- **Scoring System:** Points for matches, bonus for speed/accuracy
- **Difficulty Progression:** 3 pairs → 8 pairs → 10 pairs

#### Educational Features
- **Visual Learning:** Image-focused matching with dual language text on each card
- **Cultural Context:** Brief animal significance in Māori culture
- **Progress Tracking:** Games completed, vocabulary learned
- **Vocabulary Review:** List of learned animals with visual reinforcement

#### Technical Requirements
- **Offline Capability:** Full gameplay without internet
- **Performance:** <2 second load times, 60fps animations
- **Accessibility:** VoiceOver support, high contrast mode
- **Platforms:** iOS primary, Android secondary

### Future Features (Swift Version)

#### Enhanced Gameplay
- **Multiplayer Mode:** Local device sharing or online matches
- **Adaptive Difficulty:** AI-driven challenge adjustment
- **Achievement System:** Cultural milestones and learning badges
- **Expanded Content:** Birds, sea life, plants categories

#### Premium Features
- **Advanced Analytics:** Learning progress insights
- **Custom Card Sets:** User-generated content
- **Cultural Stories:** Animated tales about featured animals
- **Teacher Dashboard:** Classroom progress tracking

---

## User Journey

### Simple Three-Screen Flow

**Welcome Screen:**
1. **Splash screen** with Te Reo Māori cultural greeting
2. **Single "Play" button** - no complex navigation
3. Clean, inviting design with subtle cultural elements

**Game Experience:**
1. **Difficulty selection popup** - Easy (2x3), Medium (4x4), Hard (4x5)
2. **Immediate gameplay** - no tutorials or instructions needed
3. **Collaborative play** - parents and children work together as a team
4. **Visual feedback** on card flips and matches

**Completion Flow:**
1. **Celebration screen** when all pairs are matched
2. **Cultural victory animation** with positive reinforcement
3. **Return to welcome** on user confirmation
4. **Fresh start** - choose difficulty again for next game

### Design Philosophy
- **No user accounts** or progress tracking complexity
- **No tutorials** - intuitive memory game mechanics
- **No multiplayer infrastructure** - simple single-device experience
- **Immediate gratification** - start playing within seconds

---

## Technical Architecture

### React Native MVP Stack
- **Framework:** Expo for rapid development and deployment
- **State Management:** React useState for simple game state
- **Animations:** React Native Reanimated for card flip effects
- **Assets:** AI-generated flat design illustrations (PNG/SVG)
- **Testing:** Jest for component testing, basic functionality validation

### Core Components
- **WelcomeScreen:** Splash screen with cultural greeting and play button
- **DifficultyModal:** Popup for selecting Easy/Medium/Hard levels
- **GameBoard:** Grid layout with card components and match logic
- **MemoryCard:** Individual card with flip animation and dual-language text
- **CelebrationScreen:** Victory screen with cultural animation

### Simple Architecture Pattern
- **No persistence** - game state resets after each completion
- **Component-based state** - useState for cards, matches, completion status
- **Immediate feedback** - visual responses to taps and matches
- **Focus on completion** - no scoring system, just match all pairs to win

### Asset Organization
```
assets/
├── images/
│   ├── animals/
│   │   ├── kurī.png
│   │   ├── ngeru.png
│   │   └── ... (8 more animals)
│   └── ui/
│       ├── welcome-bg.png
│       └── celebration-elements.png
└── fonts/ (if needed for cultural text)
```

### Performance Targets
- **Instant app launch** with Expo Go
- **Smooth card flips** at 60fps
- **Responsive touch** - immediate visual feedback
- **Quick difficulty selection** - under 1 second transition

---

## Content Strategy

### Visual Design Philosophy
- **Flat Design Aesthetic:** Clean geometric shapes, solid colors, minimal gradients
- **Cultural Integration:** Subtle Māori-inspired pattern elements around animals (not on them)
- **Consistency:** All animals generated in single session using proven prompt template
- **Educational Focus:** Simple, recognizable illustrations optimized for children's learning

### AI Illustration Generation Strategy

**Proven Prompt Template:**
```
"Flat design illustration of [ANIMAL], geometric shapes, 
minimal Māori-inspired patterns, earth tone color palette, 
simple clean style, children's educational material, 
transparent background, vector art style, 
realistic animal colors appropriate for the species"
```

**Generation Process:**
1. **Single session generation** for all 10 animals using identical prompt
2. **Color adjustment** post-generation if needed (as demonstrated with dog example)
3. **Consistency validation** - ensure all animals match the established style
4. **Cultural sensitivity check** - verify Māori pattern elements are respectful

**Technical Specifications:**
- **Format:** PNG with transparent background for React Native compatibility
- **Resolution:** 1024x1024 for high-quality mobile display
- **Style Reference:** Lion and dog examples demonstrate target aesthetic
- **Color Palette:** Earth tones (browns, tans, muted oranges) as shown in examples

### Animal Selection by Difficulty Level

**Easy Level (2x3 = 3 pairs):**
1. Kurī (Dog) / Dog
2. Ngeru (Cat) / Cat  
3. Hipi (Sheep) / Sheep

**Medium Level (4x4 = 8 pairs):**
Previous 3 animals plus:
4. Kau (Cow) / Cow
5. Poaka (Pig) / Pig
6. Hōiho (Horse) / Horse
7. Kākā (Parrot) / Parrot
8. Kekeno (Seal) / Seal

**Hard Level (4x5 = 10 pairs):**
Previous 8 animals plus:
9. Tūī (Tui bird) / Tui
10. Kererū (Wood pigeon) / Wood pigeon

### Card Design Layout
- **Primary Focus:** Large animal illustration (75% of card space)
- **Text Placement:** Te Reo Māori and English names positioned below or as subtle overlay
- **Typography:** Clean, readable fonts with Te Reo Māori name slightly more prominent
- **Visual Hierarchy:** Image dominates for recognition, text provides learning reinforcement

### Cultural Elements
- **Pattern Integration:** Māori-inspired geometric patterns as background elements, not overlaying animals
- **Color Respect:** Earth tone palette aligns with traditional Māori design sensibilities
- **Simplicity Priority:** Cultural elements enhance without overwhelming the educational content
- **Accuracy Verification:** All Te Reo Māori names verified through Te Aka Māori Dictionary and Te Taura Whiri

---

## Success Metrics & App Store Compliance

### Primary Success Criteria

**App Store Approval & Publication**
- **Successful submission** to Apple App Store
- **Compliance with App Store Guidelines** - no rejections for policy violations
- **Technical requirements met** - proper metadata, screenshots, descriptions
- **Cultural sensitivity approval** - respectful representation of Te Reo Māori content

**Technical Performance Standards**
- **Crash-free experience** - no critical bugs that cause app termination
- **Smooth gameplay** - consistent 60fps card flip animations
- **Quick load times** - app launches within 3 seconds
- **Responsive touch** - immediate feedback on all interactions

**User Experience Quality**
- **Intuitive interface** - no user confusion requiring support
- **Positive user feedback** - qualitative reviews mentioning ease of use
- **Age-appropriate design** - suitable for children and families
- **Accessibility compliance** - VoiceOver support for inclusive design

### App Store Guidelines Compliance

**Content Standards**
- **Educational value** clearly demonstrated in app description
- **Cultural content** reviewed for appropriate representation
- **Child-friendly** design with no inappropriate content
- **No in-app purchases** - simple one-time experience

**Technical Requirements**
- **Privacy policy** (if any data collected, even minimal)
- **App Store screenshots** showing actual gameplay
- **Proper app categorization** (Education, Family Games)
- **Metadata accuracy** - description matches actual functionality

**Design Standards**
- **iOS Human Interface Guidelines** compliance
- **Consistent navigation patterns** familiar to iOS users
- **Appropriate app icon** design following Apple guidelines
- **Launch screen** that transitions smoothly to app content

---

## Risk Assessment & Mitigation

### Technical Implementation Risks

**Performance Risks**
- **Risk:** Card flip animations lag or stutter on older devices
- **Mitigation:** Test on multiple device types, optimize image sizes, use React Native Reanimated efficiently

**Asset Generation Risks**
- **Risk:** AI-generated animals lack style consistency across the set
- **Mitigation:** Generate all 10 animals in single session, create backup variations, establish clear style approval criteria

**React Native/Expo Limitations**
- **Risk:** Required animations or interactions not supported by Expo
- **Mitigation:** Validate technical approach early, have fallback to simpler implementations

### Development Process Risks

**Scope Creep**
- **Risk:** Adding features that complicate the "ultimate simplicity" approach
- **Mitigation:** Strict adherence to three-screen flow (welcome → game → celebration), regular scope review

**Timeline Risks**
- **Risk:** 3-week timeline proves unrealistic for MVP completion
- **Mitigation:** Prioritize core matching functionality first, polish features can be reduced if needed

**Language Accuracy**
- **Risk:** Te Reo Māori spelling errors in final implementation
- **Mitigation:** Double-check against verified animal list, use copy-paste from PRD to avoid typos

### App Store Submission Risks

**Technical Rejection**
- **Risk:** App crashes or has major bugs during review
- **Mitigation:** Thorough testing on real devices, crash monitoring during development

**Metadata Issues**
- **Risk:** App description doesn't match functionality or lacks required information
- **Mitigation:** Follow App Store guidelines checklist, prepare screenshots and descriptions early

**Content Classification**
- **Risk:** App incorrectly categorized, affecting discoverability
- **Mitigation:** Clear positioning as educational family game, appropriate age ratings and categories

---

## Timeline & Milestones

### Phase 1: React Native MVP (4 weeks)
- **Week 1-2:** Core game mechanics, UI, and AI illustration generation
- **Week 3:** Te Reo integration and card design implementation  
- **Week 4:** Polish, testing, and App Store submission

### Phase 2: Swift Production (8 weeks)
- **Week 1-3:** Native iOS architecture and core features
- **Week 4-6:** Enhanced animations and performance optimization
- **Week 7-8:** Advanced features and App Store optimization

### Phase 3: Enhancement (Ongoing)
- **Month 3:** Analytics implementation and user feedback integration
- **Month 4+:** Content expansion and premium features

---

*End of PRD*