# Tukly Local Logistics

i need to start with this TUKLY DELIVERY — MASTER PRODUCT & ENGINEERING PROMPT

1. PRODUCT VISION

Build a production-quality Egyptian last-mile delivery platform called:

TUKLY

توكلي

Tagline:

"من محلك لباب العميل... التوك توك يوصّلها."

English:

"From your store to their door — delivered by TukTok."

TUKLY is NOT a generic food-delivery clone and NOT a ride-hailing application.

It is a specialized:

TukTok-powered last-mile delivery platform for Egyptian merchants, customers, and delivery captains.

The platform connects:

Customers

Local merchants

TukTok delivery captains

Operations/admin teams

The core business problem:

Many Egyptian local businesses need affordable, flexible, short-distance delivery, especially in dense neighborhoods, narrow streets, markets, villages, and areas where larger vehicles are inefficient.

TUKLY uses TukToks as a specialized local delivery vehicle while providing modern digital logistics, tracking, pricing, merchant management, driver operations, and analytics.

2. IMPORTANT PRODUCT POSITIONING

Do NOT build:

Uber clone

Careem clone

Talabat clone

Generic courier clone

Generic marketplace

Passenger transportation application

Build a:

LOCAL DELIVERY OPERATING SYSTEM

for merchants and TukTok delivery captains.

The main product value is:

Fast local delivery + affordable logistics + merchant visibility + captain efficiency.

3. TARGET USERS

Create four distinct experiences.

A. CUSTOMER

Customers should be able to:

Create account

Login

Manage profile

Save addresses

Receive delivery

Track delivery

View delivery status

See captain information

Contact support

View delivery history

Rate delivery

Report delivery problem

Customer does NOT need a complicated marketplace in MVP.

The customer can primarily receive deliveries created by merchants or send a delivery request.

4. MERCHANT

The Merchant experience is one of the most important parts of the application.

Merchant dashboard must include:

Dashboard

Display:

Today's orders

Pending deliveries

Active deliveries

Completed deliveries

Failed deliveries

Cancelled deliveries

Total delivery cost

Average delivery time

Success rate

Include visual analytics.

Merchant Order Creation

Merchant can create:

New Delivery

Fields:

Customer name

Customer phone

Pickup address

Delivery address

Package type

Package description

Package size

Package weight

Special instructions

Cash collection required

COD amount

Preferred delivery time

Delivery priority

Package types:

Food

Grocery

Clothing

Electronics

Documents

Pharmacy

Small parcel

Other

Do NOT make medical/pharmacy delivery claim to be legally approved.

Treat regulated products as configurable categories requiring operational/legal approval.

5. DELIVERY REQUEST FLOW

The main merchant flow:

Merchant creates delivery.

↓

System validates:

Pickup location

Delivery location

Service zone

Package size

Vehicle capability

Delivery availability

↓

Calculate estimated delivery price.

↓

Merchant confirms request.

↓

System searches for eligible nearby captains.

↓

Captain receives request.

↓

Captain accepts.

↓

Order becomes:

ASSIGNED

↓

Captain travels to pickup.

↓

Captain confirms:

ARRIVED_AT_PICKUP

↓

Merchant hands package to captain.

↓

Captain confirms:

PICKED_UP

↓

Customer receives live tracking.

↓

Captain travels to destination.

↓

Captain confirms:

ARRIVED_AT_DESTINATION

↓

Customer receives package.

↓

Captain confirms:

DELIVERED

↓

System records:

Delivery duration

Distance

Captain earnings

Merchant cost

COD amount

Platform commission

Final status

↓

Customer/Merchant can rate the delivery.

6. DELIVERY STATUS STATE MACHINE

Implement a strict delivery state machine.

Statuses:

DRAFT
PENDING
SEARCHING_CAPTAIN
ASSIGNED
CAPTAIN_EN_ROUTE_TO_PICKUP
ARRIVED_AT_PICKUP
PICKED_UP
IN_TRANSIT
ARRIVED_AT_DESTINATION
DELIVERED
FAILED
CANCELLED
EXPIRED


Do NOT allow arbitrary status changes.

Status transitions must be controlled.

Example:

PENDING
→ SEARCHING_CAPTAIN

SEARCHING_CAPTAIN
→ ASSIGNED

ASSIGNED
→ CAPTAIN_EN_ROUTE_TO_PICKUP

CAPTAIN_EN_ROUTE_TO_PICKUP
→ ARRIVED_AT_PICKUP

ARRIVED_AT_PICKUP
→ PICKED_UP

PICKED_UP
→ IN_TRANSIT

IN_TRANSIT
→ ARRIVED_AT_DESTINATION

ARRIVED_AT_DESTINATION
→ DELIVERED

7. CAPTAIN EXPERIENCE

Create a dedicated Captain dashboard.

Captain should see:

Home

Online/offline toggle

Current zone

Today's earnings

Completed deliveries

Active delivery

Acceptance rate

Rating

Available requests

Delivery Request Card

Show:

Pickup area

Destination area

Distance

Estimated time

Package type

Package size

Estimated earning

COD amount if applicable

Special instructions

Actions:

Accept

Reject

8. CAPTAIN DELIVERY SCREEN

After accepting:

Display:

PICKUP

Merchant name

Pickup address

Contact

Package information

Navigation button

Then:

PICKUP CONFIRMATION

Captain must confirm package collection.

Then:

DELIVERY

Display:

Customer name

Destination

Phone

COD amount

Delivery instructions

Actions:

Call customer

Navigate

Mark arrived

Confirm delivered

9. CAPTAIN EARNINGS

Create a professional earnings dashboard.

Show:

Today

This week

This month

Total earnings

Delivery earnings

Bonuses

Penalties

Platform fees

Net earnings

Charts:

Daily earnings

Deliveries per day

Average delivery value

Do not implement real payment processing in MVP.

Use mock financial data and clear "Demo" indicators where appropriate.

10. ADMIN / OPERATIONS DASHBOARD

Admin dashboard is critical.

Build it like a real logistics operations center.

Sections:

Overview

KPIs:

Total deliveries

Active deliveries

Pending deliveries

Delivered today

Failed deliveries

Cancelled deliveries

Active captains

Online captains

Active merchants

Revenue

Platform commission

11. LIVE OPERATIONS MAP

Create a professional map-oriented operations screen.

Display:

Active captains

Pickup locations

Delivery locations

Active orders

Service zones

Each captain marker should visually indicate:

Online

Busy

Available

Offline

Use mock coordinates.

Do not require real GPS infrastructure for MVP.

Architect the UI so real-time GPS can be connected later.

12. SERVICE ZONES

This is an important business feature.

Create:

Service Zone Management

Admin can manage:

Zone name

City

Area

Status

Delivery radius

Base delivery fee

Per-km fee

Maximum package weight

Maximum package dimensions

Operating hours

Examples:

Tanta

Mahalla

Alexandria

Giza

Cairo

Mansoura

Use fictional/demo operational configurations.

Do not claim that the platform is legally authorized to operate in every listed location.

The platform should support configurable service zones because TukTok operation can be subject to local operational restrictions.

13. PRICING ENGINE UI

Build a configurable pricing system.

Example formula:

Delivery Price =
Base Fee
+ Distance Fee
+ Package Size Fee
+ Priority Fee
+ Optional Waiting Fee


Admin can configure:

Base fee

Price per kilometer

Minimum delivery fee

Maximum delivery fee

Large package surcharge

Priority surcharge

Waiting fee

Zone-specific pricing

Show pricing breakdown transparently.

Example:

Base delivery       25 EGP
Distance             12 EGP
Package handling      5 EGP
---------------------------
Total                42 EGP


Do NOT hard-code business pricing throughout the UI.

Centralize pricing configuration.

14. MERCHANT MANAGEMENT

Admin can:

View merchants

Approve merchant

Suspend merchant

View merchant profile

View merchant orders

View merchant performance

View merchant revenue

View merchant delivery success rate

Merchant profile:

Business name

Owner

Phone

Email

Address

Business category

Branches

Status

Created date

Total deliveries

15. CAPTAIN MANAGEMENT

Admin can:

View captains

Approve captain

Suspend captain

Activate/deactivate captain

View captain rating

View captain performance

View delivery history

View earnings

View vehicle information

Captain profile:

Full name

Phone

Status

Rating

Total deliveries

Acceptance rate

Completion rate

Average delivery time

Current zone

Vehicle type

Vehicle status

For MVP, verification documents should be represented by mock/document placeholders only.

Do not store or expose sensitive identity documents unnecessarily.

16. ORDER MANAGEMENT

Admin order table:

Columns:

Order ID

Merchant

Customer

Captain

Pickup

Destination

Status

Price

COD

Created

Updated

Filters:

Status

Date

Merchant

Captain

Zone

Package type

Search:

Order ID

Customer

Merchant

Phone

17. ORDER DETAILS

Order details page should feel like a real logistics tracking system.

Sections:

Summary

Order ID

Current status

Created at

Estimated delivery time

Customer

Name

Phone

Address

Merchant

Name

Pickup location

Phone

Captain

Name

Rating

Vehicle

Phone

Package

Type

Weight

Dimensions

Description

Financial

Delivery fee

COD

Platform commission

Captain earning

Timeline

Example:

09:32 Order created
09:34 Captain assigned
09:41 Captain arrived pickup
09:44 Package picked up
09:58 Arrived destination
10:02 Delivered


18. CUSTOMER TRACKING EXPERIENCE

Create a beautiful tracking page.

Top:

Your delivery is on the way

Show:

Current status

Estimated arrival

Captain

Vehicle

Rating

Map section:

Pickup marker

Destination marker

Captain marker

Route line

Bottom:

Delivery timeline.

For MVP use simulated movement/mock data.

Structure the code so a real WebSocket/SSE/SignalR service can later replace the simulation.

19. NOTIFICATIONS

Build notification center.

Types:

Delivery assigned

Captain arriving

Package picked up

Delivery approaching

Delivered

Cancelled

Payment/COD update

System notification

Use realistic Egyptian Arabic notification copy.

Example:

"الكابتن محمد استلم طلبك وبدأ التوصيل."

"طلبك قرب يوصل."

"تم تسليم الطلب بنجاح."

20. SUPPORT CENTER

Create support system.

Categories:

Delivery problem

Missing package

Damaged package

Wrong address

Captain issue

Merchant issue

Payment issue

Other

Create:

FAQ

Support tickets

Ticket status

Conversation UI

Statuses:

OPEN
IN_PROGRESS
WAITING_FOR_USER
RESOLVED
CLOSED


21. AUTHENTICATION UX

Create role-based authentication.

Roles:

CUSTOMER
MERCHANT
CAPTAIN
ADMIN
OPERATIONS
SUPPORT


After login, route the user to the correct dashboard.

Use mock/demo authentication if backend authentication is not configured.

Architect authentication cleanly so Supabase Auth can be connected.

Do NOT fake security by storing sensitive credentials in frontend code.

22. DEMO MODE

Because this is an MVP/prototype, create a polished demo environment.

Provide demo users:

Customer Demo
Merchant Demo
Captain Demo
Operations Demo
Admin Demo


Make it obvious that demo data is simulated.

The application should feel functional during demonstration.

23. DATABASE / BACKEND ARCHITECTURE

Use Supabase if backend functionality is required.

Recommended entities:

profiles
customers
merchants
merchant_branches
captains
vehicles
service_zones
deliveries
delivery_status_history
delivery_items
addresses
pricing_rules
payments
wallet_transactions
ratings
notifications
support_tickets
support_messages
audit_logs


Use proper relationships.

Do not duplicate data unnecessarily.

Use IDs consistently.

Use timestamps:

created_at
updated_at


Use status enums/constants where possible.

24. REAL-TIME ARCHITECTURE

Prepare the architecture for:

Captain location updates

Delivery status updates

Order assignment

Notifications

Operations dashboard updates

Potential future implementation:

Captain App
     ↓
Realtime Location
     ↓
Backend
     ↓
Realtime Channel
     ↓
Customer
     ↓
Operations Dashboard


For MVP:

Use simulated real-time updates.

Do NOT pretend simulated tracking is real GPS.

25. DESIGN DIRECTION

The UI must feel:

Egyptian

modern

practical

energetic

trustworthy

urban

logistics-focused

Avoid generic startup UI.

Avoid copying Talabat, Uber, Careem, or other existing brands.

Create an original visual identity.

26. BRAND IDENTITY

Brand:

TUKLY

Arabic:

توكلي

Possible visual concept:

A modern simplified TukTok silhouette combined with:

location pin

package

movement line

Logo should be simple and recognizable.

Do not use a literal cartoon TukTok.

Use a professional geometric mark.

27. COLOR SYSTEM

Create centralized design tokens.

Primary:

Deep Navy
#102A43


Secondary:

Egyptian Nile Blue
#167D9A


Accent:

Warm Orange
#F28C28


Success:

#2E8B57


Danger:

#D64545


Background:

#F7F8FA


Dark background:

#0B1117


Do not scatter raw colors across components.

Use semantic CSS variables/tokens.

Example:

--color-primary
--color-secondary
--color-accent
--color-background
--color-surface
--color-border
--color-muted
--color-success
--color-danger


28. TYPOGRAPHY

Arabic must feel native.

Use a modern Arabic-friendly font such as:

IBM Plex Sans Arabic

Noto Sans Arabic

For Latin:

Inter

Manrope

Typography must work correctly in both:

Arabic RTL
English LTR


Do NOT simply mirror the English UI.

Arabic content must be properly localized.

29. BILINGUAL SUPPORT

Support:

Arabic
English


Default:

Arabic


Implement:

ar
en


Switch:

RTL ↔ LTR


The entire layout must react correctly.

Arabic UI examples:

الرئيسية
الطلبات
التوصيلات
الكباتن
التجار
الأرباح
المناطق
الإعدادات
الدعم


English:

Dashboard
Orders
Deliveries
Captains
Merchants
Earnings
Zones
Settings
Support


30. EGYPTIAN CULTURAL DIRECTION

The product should clearly feel designed for Egypt.

Use subtle references:

Egyptian streets

local stores

neighborhood commerce

Arabic-first UX

cash on delivery

local merchant behavior

Egyptian address patterns

local delivery terminology

Use realistic examples such as:

طنطا

المحلة الكبرى

الإسكندرية

القاهرة

الجيزة

المنصورة

Do NOT overuse:

pyramids

pharaohs

flags

stereotypical Egyptian imagery

This is a modern logistics company, not a tourism website.

31. ADDRESS UX

Egyptian addresses are often not standardized.

Create flexible address fields:

Governorate
City
Area
Street
Building
Floor
Apartment
Landmark
Additional instructions


Example:

طنطا
منطقة الاستاد
شارع البحر
عمارة 12
الدور الثالث
شقة 8

علامة مميزة:
بجوار صيدلية النور


This is very important for the product.

32. MAP UX

Build map-ready components.

Map must support:

Pickup

Destination

Captain

Route

Service zones

For MVP, use mock map data if external map provider is unavailable.

Structure components so Google Maps / Mapbox / another provider can be integrated later.

Do not expose API keys in frontend source.

33. MOBILE-FIRST DESIGN

The application must work extremely well on:

320px
375px
390px
430px
768px
1024px
1280px
1440px+


Mobile is extremely important.

Captain experience should prioritize mobile usability.

Buttons must be:

large

touch friendly

easy to reach

visually obvious

34. DESKTOP ADMIN DESIGN

Admin is desktop-first.

Use:

Sidebar

Top navigation

KPI cards

Tables

Filters

Charts

Maps

Detail drawers

Modal dialogs

Responsive fallback must still exist.

35. COMPONENT ARCHITECTURE

Create reusable components.

Examples:

AppShell
Sidebar
Topbar
PageHeader
StatCard
StatusBadge
DeliveryCard
CaptainCard
MerchantCard
OrderTable
OrderTimeline
MapContainer
TrackingCard
PricingBreakdown
AddressCard
EmptyState
LoadingState
ErrorState
ConfirmDialog
SearchInput
FilterBar
DateRangePicker
NotificationCenter


Do NOT duplicate components.

36. FRONTEND ARCHITECTURE

Use a scalable architecture.

Prefer:

src/
  app/
  components/
  layouts/
  pages/
  features/
    deliveries/
    merchants/
    captains/
    customers/
    pricing/
    zones/
    tracking/
    notifications/
    support/
  services/
  stores/
  hooks/
  lib/
  types/
  data/
  i18n/
  styles/


Keep business logic outside UI components.

Avoid giant components.

Avoid duplicated business logic.

37. STATE MANAGEMENT

Use centralized state only where needed.

Examples:

Auth

Current user

Language

Theme

Delivery state

Notifications

Do not put every form field into global state.

Keep local UI state local.

38. THEMING

Support:

Light
Dark
System


Theme must persist.

Do not create separate duplicated pages for dark mode.

Use semantic design tokens.

39. ANIMATION

Use subtle professional animations.

Examples:

Card entrance

Status transitions

Sidebar transitions

Map marker movement

Toast notifications

Modal transitions

Avoid excessive animation.

Support:

prefers-reduced-motion


No distracting effects.

40. ICONS

Use a consistent icon library.

Prefer:

Lucide Icons

Do NOT use emoji as interface icons.

No:

🚚
📦
📍
💰

Use proper SVG/icon components instead.

41. TABLE UX

Tables must support:

Search

Filtering

Sorting

Pagination

Responsive behavior

Empty states

Loading states

Error states

On mobile, transform dense tables into cards where appropriate.

42. ERROR HANDLING

Never show raw technical errors.

Bad:

TypeError: Cannot read properties of undefined


Good:

حدث خطأ أثناء تحميل الطلبات.
حاول مرة أخرى.


Provide retry actions.

43. LOADING STATES

Use skeleton loaders.

Do not show blank screens.

Every asynchronous screen should support:

Loading
Success
Empty
Error


44. EMPTY STATES

Examples:

No deliveries:

مفيش توصيلات لسه

لما تنشئ أول طلب توصيل، هتظهر تفاصيله هنا.


No captains:

لا يوجد كباتن متاحين حالياً


Make empty states useful, not decorative.

45. SECURITY

Follow secure frontend practices.

Never:

expose secrets

expose service-role keys

hardcode API credentials

store sensitive credentials insecurely

trust client-side roles blindly

Use backend authorization/RLS where Supabase is used.

Admin functionality must be protected.

46. AUDIT LOG

Create an audit log model.

Record important actions:

Order created
Order assigned
Order cancelled
Captain approved
Merchant approved
Pricing changed
Zone changed
Admin login
Status changed


Show:

Actor

Action

Entity

Timestamp

47. ANALYTICS

Admin analytics:

Delivery volume

Today

This week

This month

Delivery performance

Average delivery time

Completion rate

Failure rate

Cancellation rate

Captain performance

Deliveries

Rating

Acceptance rate

Earnings

Merchant performance

Orders

Successful deliveries

Average delivery time

Total delivery spend

Use realistic demo data.

48. DASHBOARD VISUALIZATION

Use clean charts.

Examples:

Delivery volume line chart

Revenue bar chart

Status donut chart

Captain performance chart

Zone performance chart

Charts must remain readable in Arabic RTL.

49. MVP SCOPE

Prioritize these features first:

Phase 1

Core

Authentication

Role-based dashboards

Merchant delivery creation

Captain delivery acceptance

Delivery status lifecycle

Customer tracking

Admin dashboard

Service zones

Pricing

Notifications

Demo data

Arabic/English

RTL/LTR

Light/Dark

Do NOT overbuild payment gateways, advanced AI, complex fleet management, or real GPS infrastructure in the first version.

50. PHASE 2

Prepare architecture for:

Real GPS tracking

WebSockets / Supabase Realtime

Push notifications

Digital wallets

Online payment

Captain wallet

Merchant billing

Scheduled deliveries

Delivery batching

Multiple packages

Proof of delivery

OTP delivery confirmation

51. PHASE 3

Future capabilities:

Smart Dispatch

Automatically select captain based on:

Distance
Current workload
Vehicle capacity
Captain rating
Zone
Estimated arrival
Historical performance


Potential scoring:

CaptainScore =
DistanceWeight
+ AvailabilityWeight
+ PerformanceWeight
+ ZoneWeight
+ CapacityWeight


Keep this as future architecture, not MVP complexity.

52. PHASE 4

Future B2B logistics:

Allow merchants to:

Manage branches

Create bulk deliveries

Import CSV orders

Track all shipments

Generate reports

Manage staff

Configure delivery rules

53. DESIGN QUALITY BAR

The application must look like a serious startup product that could be presented to investors or used as a portfolio project.

Do NOT produce:

generic dashboard templates

excessive gradients

random glassmorphism

huge rounded cards everywhere

inconsistent spacing

excessive shadows

placeholder lorem ipsum

fake random statistics without labels

generic SaaS illustrations

Design should feel:

Modern Egyptian Logistics + Mobility Technology.

54. UX DETAILS

Important UX behaviors:

Delivery creation

Use a multi-step or intelligently grouped form:

1. Pickup
2. Destination
3. Package
4. Delivery options
5. Price
6. Confirmation


Show progress.

55. DELIVERY CONFIRMATION

Before submitting:

Display:

Pickup
Destination
Package
Distance
Estimated time
Delivery price
COD
Special instructions


Then:

Confirm Delivery

56. DELIVERY TRACKING

Tracking should visually communicate:

✓ الطلب اتعمل
✓ الكابتن اتعيّن
✓ الكابتن في الطريق
✓ استلم الطلب
● الطلب في الطريق
○ تم التسليم


Make this extremely clear.

57. TRUST & SAFETY

Create a trust layer.

Show:

Captain rating

Verified status

Delivery history

Support access

Order ID

Delivery timeline

Do not make unsupported claims such as "insured" or "government approved".

Only display capabilities actually implemented.

58. DEMO DATA

Create realistic Egyptian demo data.

Merchants:

مخبز الرحمة
ماركت المدينة
صيدلية النور
مطعم بيت العيلة
محل البركة
حلويات طنطا


Captains:

محمد السيد
أحمد حسن
محمود علي
إسلام محمد


Customers:

أحمد
محمد
مريم
سارة


Keep data fictional.

59. SAMPLE DELIVERY

Create demo order:

Order:
TK-2026-00128

Merchant:
مخبز الرحمة

Pickup:
طنطا - شارع البحر

Customer:
أحمد محمد

Destination:
طنطا - منطقة الاستاد

Package:
Food

COD:
250 EGP

Delivery:
35 EGP

Captain:
محمد السيد

Status:
IN_TRANSIT


This order should be usable throughout the demo UI.

60. LANDING PAGE

Create a public landing page.

Hero:

"كل طلباتك...

توصّلها توكلي."

Subheadline:

"من المحل لباب العميل، توصيل محلي أسرع وأسهل باستخدام شبكة كباتن توك توك."

Primary CTA:

ابدأ كتاجر

Secondary CTA:

انضم ككابتن

Hero visual:

Modern TukTok delivery vehicle carrying a small package.

Avoid cartoon style.

Use premium realistic/local visual direction.

61. LANDING PAGE SECTIONS

Include:

Hero

How it works

For merchants

For customers

For captains

Why TukTok delivery

Delivery tracking preview

Service zones

Statistics

FAQ

CTA

Footer

62. LANDING PAGE COPY

Use real product language.

Example:

For Merchants

"خلي التوصيل علينا، وركز في شغلك."

For Captains

"خلي التوصيلات توصلك بدل ما تدور على الشغل."

For Customers

"طلبك في الطريق... وتقدر تتابعه لحظة بلحظة."

Avoid exaggerated marketing claims.

63. NAVIGATION

Public:

الرئيسية
كيف يعمل
للتجار
للكباتن
المناطق
الأسئلة الشائعة
تسجيل الدخول


Authenticated:

Dashboard
Deliveries
Tracking
Earnings
Notifications
Support
Settings


Admin:

Overview
Orders
Deliveries
Captains
Merchants
Customers
Zones
Pricing
Analytics
Support
Audit Logs
Settings


64. RESPONSIVE NAVIGATION

Desktop:

Sidebar.

Tablet:

Collapsible sidebar.

Mobile:

Bottom navigation where appropriate.

Captain mobile navigation:

الرئيسية
الطلبات
الأرباح
الإشعارات
حسابي


65. TECHNICAL REQUIREMENTS

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Lucide Icons

React Router

TanStack Query where useful

Supabase where backend persistence is needed

Use strict TypeScript.

Avoid any unless absolutely unavoidable.

Create typed domain models.

66. CODE QUALITY

Do NOT create:

huge files

duplicated components

duplicated styles

duplicated constants

hardcoded business logic inside UI

deeply nested conditional rendering

unnecessary global state

unnecessary dependencies

Prefer:

reusable components

feature modules

typed interfaces

constants

service abstractions

clean separation of concerns

67. CSS QUALITY

Centralize design tokens.

Avoid:

!important


unless genuinely necessary.

Do not repeatedly redefine the same styles.

Do not create multiple competing versions of the same component.

Tailwind should be the primary styling approach.

68. ACCESSIBILITY

Support:

keyboard navigation

semantic HTML

visible focus states

sufficient contrast

screen-reader labels

accessible dialogs

accessible form validation

Do not rely only on color to communicate status.

69. SEO

Public pages should have:

proper title

description

semantic headings

Open Graph metadata

favicon

meaningful URLs

Authenticated dashboards do not need unnecessary SEO complexity.

70. PERFORMANCE

Optimize for:

lazy-loaded routes

optimized images

minimized unnecessary re-renders

efficient lists

pagination

caching

debounced search

lightweight animations

Do not load huge assets unnecessarily.

71. IMAGE STRATEGY

Use high-quality local or properly licensed assets.

Preferred imagery:

Egyptian urban streets

local stores

modern TukToks

packages

delivery scenes

merchants

captains

neighborhoods

Do NOT use:

random unrelated stock photos

images with wrong cultural context

fake logos

copyrighted brand imagery

broken external image URLs

Keep image paths centralized.

72. MOCK API / DATA LAYER

Even if using mock data initially, do NOT directly scatter mock arrays across components.

Create:

services/
data/
types/


Example:

deliveryService
merchantService
captainService
zoneService
analyticsService


This allows replacing mock services with Supabase/API implementations later.

73. FORM VALIDATION

Use schema-based validation.

Validate:

phone

required fields

package weight

address

COD amount

delivery zone

package dimensions

Display Arabic validation messages.

Example:

"من فضلك أدخل عنوان الاستلام."

74. BUSINESS RULES

Implement basic rules:

Delivery must have pickup and destination.

Pickup and destination must be inside supported service zones.

Package must be within configured vehicle capacity.

Delivery price must come from pricing configuration.

Only eligible captains can receive a delivery.

Only assigned captain can change active delivery state.

Delivered orders cannot be edited.

Cancelled orders cannot continue.

COD must be non-negative.

Every important state change must create a timeline record.

75. ADMIN BUSINESS CONTROLS

Admin should be able to configure:

Service Zones
Pricing
Package Types
Delivery Priorities
Captain Status
Merchant Status
Delivery Status
Operating Hours


Do not hardcode these rules in multiple places.

76. AUDITABILITY

Every critical mutation should be traceable.

Example:

Admin Ahmed changed pricing rule
Zone: Tanta
Old base fee: 20
New base fee: 25
Timestamp: ...


77. TESTING

Create a testing strategy.

At minimum test:

Delivery state transitions

Pricing calculation

Zone validation

Authentication routing

Role permissions

Form validation

Language switching

RTL layout

Responsive layouts

78. ACCEPTANCE CRITERIA

The project is NOT complete unless:

App starts successfully

Production build succeeds

TypeScript has no blocking errors

No broken routes

No broken images

No console errors

Arabic works

English works

RTL works

LTR works

Light mode works

Dark mode works

Mobile works

Desktop works

Customer flow works

Merchant flow works

Captain flow works

Admin flow works

Demo data works

Delivery state machine works

Pricing works

Service zones work

Tracking demo works

Notifications work

Search/filtering works

Empty states work

Loading states work

Error states work

79. IMPORTANT LOVABLE EXECUTION RULE

Do not stop after generating the UI.

Actually implement the flows.

After implementation:

Run the application.

Inspect every route.

Test every primary CTA.

Test navigation.

Test forms.

Test language switch.

Test RTL.

Test dark mode.

Test mobile layout.

Test demo login.

Test merchant delivery creation.

Test captain acceptance.

Test delivery status transitions.

Test customer tracking.

Test admin dashboard.

Fix all errors.

Run production build.

Fix all build/type errors.

Remove unused code.

Remove duplicated styles/components.

Do not report "implemented" until the application has actually been verified.

80. FINAL PRODUCT QUALITY

The final result should feel like:

A real Egyptian logistics startup MVP

not:

A generated dashboard template.

The strongest experience should be:

Merchant creates delivery → system prices it → captain accepts → captain picks up → customer tracks → captain delivers → system records earnings and analytics.

That single workflow must be extremely polished.

81. DEVELOPMENT PRIORITY

Build in this exact order:

STEP 1

Design system + branding.

STEP 2

Application shell + navigation.

STEP 3

Authentication + roles.

STEP 4

Merchant dashboard.

STEP 5

Delivery creation.

STEP 6

Captain dashboard.

STEP 7

Captain assignment.

STEP 8

Delivery lifecycle.

STEP 9

Customer tracking.

STEP 10

Admin operations dashboard.

STEP 11

Service zones.

STEP 12

Pricing engine.

STEP 13

Notifications.

STEP 14

Analytics.

STEP 15

Support.

STEP 16

Responsive/mobile optimization.

STEP 17

Arabic/English QA.

STEP 18

Accessibility.

STEP 19

Performance optimization.

STEP 20

Production build verification.

82. DO NOT OVERENGINEER THE MVP

Avoid implementing prematurely:

Microservices

Complex event sourcing

Blockchain

AI dispatch

Advanced route optimization

Real payment gateway

Full accounting system

Complex warehouse management

Full ERP

Design extension points for them, but keep the MVP maintainable.

83. THE CORE DIFFERENTIATOR

The application should communicate this clearly:

TUKLY is not another delivery marketplace.

It is:

"The delivery operating system for local Egyptian merchants powered by TukToks."

Focus on:

Local commerce
+
Affordable last-mile logistics
+
TukTok network
+
Merchant tools
+
Real-time operations

84. FINAL INSTRUCTION

Build the application as a coherent product.

Do not generate disconnected pages.

Every screen must connect to a real business flow.

Every important action must have:

loading state

success state

error state

empty state

Use realistic Egyptian data.

Use Arabic-first UX.

Use professional English localization.

Use RTL/LTR correctly.

Use responsive design.

Use clean reusable architecture.

Use centralized design tokens.

Use no emojis as UI icons.

Use no lorem ipsum.

Use no broken images.

Use no fake unsupported claims.

Use no unnecessary complexity.

Most importantly:

MAKE TUKLY FEEL LIKE A REAL PRODUCT.

The final demo should allow someone to open the application and understand the complete business within 2 minutes:

Merchant → Delivery → Captain → Tracking → Customer → Delivered → Analytics.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f8a5aba8-fa4c-4fc2-a70d-44fc62a161e7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
