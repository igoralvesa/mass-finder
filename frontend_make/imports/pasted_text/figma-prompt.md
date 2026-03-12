Prompt para Figma Make

You are generating only UI screens and components, not application logic.

The goal is to design the UI of a web application where churches (parishes) can register and publish their mass schedules, and visitors can search for mass times.

Focus only on layout, UI components, and styling.

Do NOT implement:

API calls

React hooks

State management

Business logic

Authentication logic

Use mock data placeholders where needed.

Tech Stack Constraints

Generate UI as if it were implemented with:

React

TailwindCSS

shadcn/ui components

TanStack Router for navigation structure

Use shadcn patterns for:

Cards

Tables

Forms

Sidebar

Dialogs

Buttons

Inputs

Select filters

Use a clean, modern, minimal UI similar to SaaS dashboards.

Project Context

The system has 3 main areas:

Public area (no login required)

Parish dashboard (after parish login)

Admin dashboard (after admin login)

Each area should have its own layout.

Use mock data placeholders for parishes and mass schedules.

IMPORTANT

Focus only on the 3 core screens of the application.

Do NOT generate extra pages unless strictly necessary.

Screen 1 — Public Home Page

Purpose: allow any visitor to search for mass schedules.

Layout:

Header

App name: "Mass Finder"

Navigation:

Home

Register Parish

Parish Login

Main section:

Title:
"Find Mass Times Near You"

Filters section (horizontal card)

Filters:

Select: Neighborhood (bairro)

Select: Day of week

Search button

Results section:

Display a list of parishes.

Each parish should be shown as a Card with:

Parish name

Neighborhood

Address

Mass schedule list

Example mass schedule:

Sunday — 07:00, 10:00, 18:00
Wednesday — 19:30

Cards should be responsive and clean.

Optional UX improvements:

Empty state

Loading skeleton

Badge showing number of masses

Screen 2 — Parish Dashboard

This is the dashboard for a parish after login.

Layout:

Sidebar navigation on the left.

Sidebar items:

Parish Information

Mass Schedule

Top bar:

Parish name

Logout button

Page: Parish Information

Form inside a Card.

Fields:

Parish Name

Neighborhood

Address

Contact email

Buttons:

Save changes

Use shadcn form components.

Page: Mass Schedule Management

Display schedules in a Table.

Columns:

Day of week

Time

Actions

Actions:

Edit

Delete

Above the table:

Button:
"Add Mass Time"

Clicking opens a Dialog modal with form:

Fields:

Day of week (select)

Time (time input)

Buttons:

Save

Cancel

Use mock data.

Screen 3 — Admin Dashboard

Admin layout should be similar to the parish dashboard.

Sidebar items:

Parish Management

Parish Requests

Top bar:

Admin

Logout

Page: Parish Management

Table listing approved parishes.

Columns:

Parish Name

Neighborhood

Status

Actions

Actions:

View

Disable

Page: Parish Requests

Table showing pending parish registrations.

Columns:

Parish Name

Neighborhood

Address

Request date

Actions

Actions:

Approve button
Reject button

Use colored buttons:

Green for approve

Red for reject

UI Guidelines

Use shadcn UI primitives.

Design style:

Modern SaaS style

Clean cards

Soft shadows

Rounded corners

Neutral colors

Accessible spacing

Responsive layout

Use Tailwind spacing and typography conventions.

Avoid overly complex visuals.

Components to Generate

Reusable components:

ParishCard

MassScheduleTable

SidebarLayout

FilterBar

DashboardHeader

Important

Generate only UI and layout.

All data should be mocked with placeholders like:

const parishes = [
 { name: "Paróquia São José", neighborhood: "Centro", masses: [...] }
]

No API integration.

No hooks.

No business logic.