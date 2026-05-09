# 📅 Timeline View Guide

## Overview

The Timeline View provides a chronological visualization of all family events (births, deaths, marriages) in your family tree. It helps you understand the historical context and sequence of events across generations.

## Features

### 🎯 Core Features

1. **Chronological Display**
   - All events sorted by date
   - Visual timeline with event cards
   - Color-coded by event type

2. **Multiple View Modes**
   - **Year View**: Events grouped by year
   - **Decade View**: Events grouped by decade (1920s, 1930s, etc.)
   - **Century View**: Events grouped by century (19th, 20th, etc.)

3. **Layout Options**
   - **Vertical Layout**: Traditional top-to-bottom timeline
   - **Horizontal Layout**: Left-to-right scrolling timeline

4. **Event Types**
   - 👶 **Births** (Green)
   - 🕊️ **Deaths** (Gray)
   - 💑 **Marriages** (Pink)

5. **"Today" Marker**
   - Shows current date on timeline
   - Helps visualize living family members
   - Animated pulse effect

## How to Use

### Accessing Timeline View

1. Click **"Timeline"** in the navigation menu
2. Timeline automatically loads all events from your family data
3. Events are displayed in chronological order

### Changing View Mode

**Year View** - Most detailed
- Shows events grouped by individual years
- Best for recent history or small families

**Decade View** - Balanced (Default)
- Groups events by decades (1920s, 1930s, etc.)
- Good for medium-sized families
- Easier to see patterns

**Century View** - Overview
- Groups events by centuries
- Best for large families spanning many generations
- Shows big picture

### Switching Layouts

**Vertical Layout** (Default)
- Traditional timeline format
- Scroll down to see older events
- Better for reading on desktop

**Horizontal Layout**
- Scroll left to right
- More compact
- Better for presentations

### Filtering Events

Click **"🔍 Filters"** to show filter options:

#### Event Type Filters
- Toggle births, deaths, marriages on/off
- Useful for focusing on specific events

#### Date Range Filter
- Set start year and end year
- Example: 1900 to 1950
- Shows only events in that range

#### Location Filter
- Enter location name
- Shows events from that location
- Example: "New York" or "England"

### Viewing Event Details

Each event card shows:
- **Date**: When the event occurred
- **Description**: What happened
- **Location**: Where it happened (if available)
- **Person Link**: Click to view person details

### Exporting Timeline

Click **"📤 Export"** to export timeline data:

**JSON Format**
- Complete data with all details
- Can be imported back into app
- Good for backups

**CSV Format**
- Spreadsheet-compatible
- Easy to analyze in Excel
- Good for reports

**Print**
- Print-friendly format
- Removes controls and filters
- Good for physical records

## Timeline Statistics

The statistics panel shows:

### Overview Stats
- **Total Events**: Count of all events
- **Time Span**: Years between earliest and latest events
- **Earliest Event**: First recorded event
- **Latest Event**: Most recent event

### Top Locations
- Most common event locations
- Helps identify family migration patterns
- Shows event count per location

### Most Active Decades
- Decades with most events
- Helps identify important periods
- Shows family growth patterns

## Event Colors & Icons

### Birth Events 👶
- **Color**: Green (#10b981)
- **Icon**: Baby emoji
- **Description**: "[Name] was born"

### Death Events 🕊️
- **Color**: Gray (#6b7280)
- **Icon**: Dove emoji
- **Description**: "[Name] died"

### Marriage Events 💑
- **Color**: Pink (#ec4899)
- **Icon**: Couple emoji
- **Description**: "[Name] and [Name] married"

## Tips & Best Practices

### 1. Start with Decade View
- Good balance of detail and overview
- Easier to navigate than year view
- Shows patterns clearly

### 2. Use Filters for Focus
- Filter by event type to see only births or deaths
- Use date range to focus on specific periods
- Location filter helps track migrations

### 3. Export for Analysis
- Export to CSV for spreadsheet analysis
- Create charts and graphs
- Share with family members

### 4. Print for Records
- Print timeline for physical records
- Good for family reunions
- Easy to share with older relatives

### 5. Check "Today" Marker
- Shows where living family members are
- Helps visualize current generation
- Useful for planning future events

## Understanding the Timeline

### Reading the Timeline

**Vertical Layout:**
```
[Period Header: 1920s]
  ├─ 1920: John Smith born
  ├─ 1922: Mary Jones born
  └─ 1925: John and Mary married

[Period Header: 1930s]
  ├─ 1930: Baby Smith born
  └─ 1935: Another event
```

**Horizontal Layout:**
```
[1920s] → [1930s] → [1940s] → [Today]
```

### Event Card Structure

```
┌─────────────────────────────┐
│ 👶 [Icon]                   │
│                             │
│ Jan 15, 1920    [birth]     │
│ John Smith was born         │
│ 📍 New York, NY             │
│                             │
│ [View John Smith →]         │
└─────────────────────────────┘
```

## Common Use Cases

### 1. Family History Research
- See chronological sequence of events
- Identify gaps in family history
- Find patterns in family migrations

### 2. Genealogy Reports
- Export timeline for reports
- Print for family books
- Share with researchers

### 3. Family Reunions
- Display timeline at events
- Show family history visually
- Engage younger generations

### 4. Historical Context
- See family events in historical context
- Understand generational patterns
- Track family migrations

### 5. Data Verification
- Check for date inconsistencies
- Verify event sequences
- Find missing information

## Troubleshooting

### No Events Showing

**Problem**: Timeline is empty

**Solutions**:
- Check that family data has dates
- Verify birth/death/marriage dates are entered
- Clear filters (click "Clear All")
- Check date range filter

### Events Out of Order

**Problem**: Events appear in wrong order

**Solutions**:
- Check date formats (should be YYYY-MM-DD)
- Verify dates are correct in family data
- Refresh the timeline view

### Missing Events

**Problem**: Some events don't appear

**Solutions**:
- Check event type filters (births/deaths/marriages)
- Verify date range filter
- Check location filter
- Ensure dates are in correct format

### "Today" Marker Not Showing

**Problem**: Current date marker missing

**Solutions**:
- Marker only shows if there are living people
- Check that some people don't have death dates
- Verify current year is within timeline range

## Advanced Features

### Programmatic Access

```javascript
// Get timeline manager
const timeline = window.timelineManager;

// Collect events
timeline.collectEvents();

// Get all events
const events = timeline.events;

// Get events for a person
const personEvents = timeline.getPersonEvents('I1');

// Get events in date range
const rangeEvents = timeline.getEventsInRange(1900, 1950);

// Search events
const results = timeline.searchEvents('New York');

// Get statistics
const stats = timeline.getStatistics();

// Export data
const jsonData = timeline.exportTimeline('json');
const csvData = timeline.exportTimeline('csv');
```

### Custom Filtering

```javascript
// Set custom filters
timeline.filters = {
  eventTypes: ['birth', 'marriage'], // Only births and marriages
  dateRange: { start: 1900, end: 2000 },
  locations: ['New York', 'Boston']
};

// Apply filters
timeline.applyFilters();

// Re-render timeline
window.timelineUI.render();
```

## Keyboard Shortcuts

- **Arrow Keys**: Navigate timeline (horizontal layout)
- **Home**: Jump to earliest event
- **End**: Jump to latest event
- **Ctrl/Cmd + P**: Print timeline
- **Ctrl/Cmd + F**: Focus search (if implemented)

## Mobile Usage

### Touch Gestures
- **Swipe**: Scroll timeline
- **Tap**: View event details
- **Pinch**: Zoom (if implemented)

### Mobile Tips
- Use vertical layout for easier scrolling
- Decade view works best on mobile
- Export to view on larger screen

## Privacy Considerations

### Living People
- Events for living people are marked as "Private"
- Details hidden to protect privacy
- Only shows if person has no death date

### Sensitive Information
- Consider date range filters for privacy
- Export options respect privacy settings
- Print view can be customized

## Performance

### Large Families
- Timeline handles thousands of events
- Grouping by decade/century improves performance
- Filters help focus on relevant events

### Loading Time
- Initial load collects all events
- Subsequent views are cached
- Filtering is instant

## Future Enhancements

Potential additions:
- Historical events integration
- Photo timeline
- Interactive zoom
- Event editing from timeline
- Relationship connections
- DNA timeline integration
- AI-powered insights

## Support

### Need Help?
- Check this guide first
- Review sample data
- Contact support

### Report Issues
- Describe the problem
- Include screenshot
- Note browser and device

---

**Last Updated**: May 9, 2026
**Version**: 1.0.0
**Status**: ✅ Complete and Ready to Use