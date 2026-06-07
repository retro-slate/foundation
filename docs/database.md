# Database Architecture

## Overview

The RetroSlate Foundation database is designed to support:

* Geographic regions
* Global Health Index (GHI) scoring
* Organizations and initiatives
* Projects and events
* Reports and sources
* Interactive map visualization
* Historical data tracking

The database follows a data-first architecture:

```text
Raw Data
↓
Conversion Rules
↓
Normalized Scores
↓
GHI Scores
↓
API
↓
Map & Website
```

---

# Core Tables

## Regions

Stores geographic areas.

### Supported Levels

* Country
* State / Province
* District
* City

### Fields

```text
id
name
slug
region_type
parent_region
description
latitude
longitude
geojson_boundary
current_ghi_score
data_status
created_at
updated_at
```

### Example

```text
India
└── Kerala
    └── Malappuram
        └── Nilambur
```

---

## GHI Categories

Stores the six major GHI categories.

### Fields

```text
id
name
slug
description
weight
```

### Categories

```text
Environmental Health
Human Wellbeing
Animal Welfare
Community Health
Economic Stability
Governance
```

---

## GHI Metrics

Stores individual indicators.

### Fields

```text
id
category
name
slug
description
unit
direction
weight
is_active
```

### Direction Values

```text
higher_is_better
lower_is_better
target_range
binary
composite
```

### Example Metrics

Environmental:

* Air Quality
* Water Quality
* Waste Management
* Renewable Energy Use
* Forest Coverage
* Biodiversity

Human Wellbeing:

* Education
* Healthcare Access
* Life Expectancy
* Walkability
* Housing Quality
* Food Security

Animal Welfare:

* Stray Population Management
* Animal Cruelty Rates
* Shelter Availability
* Veterinary Access
* Wildlife Protection

Community Health:

* Volunteer Participation
* Public Spaces
* Crime Rates
* Accessibility
* Community Organizations

Economic Stability:

* Employment
* Median Income
* Cost Of Living
* Small Business Health

Governance:

* Government Transparency
* Corruption Perception
* Public Healthcare Investment
* Education Investment
* Environmental Protection Laws
* Animal Welfare Laws
* Public Transport Quality
* Accessibility Standards
* Renewable Energy Adoption
* Waste Management Effectiveness
* Infrastructure Development

---

## Conversion Rules

Defines how raw values become scores.

### Fields

```text
id
metric
rule_type
minimum_value
maximum_value
target_value
formula
version
is_active
```

### Purpose

Converts:

```text
Raw Metric Value
↓
0–100 Score
```

Example:

```text
Air Quality
Raw AQI: 82

↓ Conversion

Score: 74
```

---

## Metric Values

Stores raw collected data.

### Fields

```text
id
region
metric
raw_value
unit
year
source
confidence_level
notes
created_at
updated_at
```

### Confidence Levels

```text
high
medium
low
estimated
```

---

## Metric Scores

Stores normalized metric scores.

### Fields

```text
id
region
metric
metric_value
normalized_score
calculated_at
```

### Example

```text
Air Quality
Raw Value: 82 AQI
Score: 74
```

---

## GHI Scores

Stores category and overall scores.

### Fields

```text
id
region
year

environmental_score
human_wellbeing_score
animal_welfare_score
community_health_score
economic_stability_score
governance_score

overall_score

data_completeness
methodology_version

created_at
updated_at
```

---

## GHI History

Stores historical score snapshots.

### Fields

```text
id
region
ghi_score
snapshot_date
notes
```

Used for:

* Trend graphs
* Historical comparisons
* Annual reports

---

# Entities

Represents map dots.

### Supported Types

```text
organization
ngo
activist
project
event
company
product
initiative
```

### Fields

```text
id
name
slug
entity_type

description
short_description

image
website

latitude
longitude

country
state
district
city

status
verification_status

created_at
updated_at
```

---

## Entity Region Links

Links entities to regions.

### Fields

```text
id
entity
region
relationship_type
```

### Examples

```text
Operates In
Headquartered In
Supports
Impacts
```

---

# Projects

Tracks initiatives and activities.

### Fields

```text
id
name
slug

description

status

start_date
end_date

image

website

region

created_at
updated_at
```

### Status Values

```text
planned
active
completed
paused
cancelled
```

---

# Events

Tracks public events.

### Fields

```text
id
name
slug

description

event_date

location

region

registration_url

created_at
updated_at
```

---

# Reports

Stores public reports.

### Fields

```text
id
title
slug

summary

content

report_type

published_date

region

author

created_at
updated_at
```

### Types

```text
environmental
animal_welfare
community
governance
economic
research
transparency
annual
```

---

# Sources

Stores citations and references.

### Fields

```text
id
title

organization

url

publication_date

source_type

notes

created_at
```

### Source Types

```text
government
ngo
research
international
news
academic
foundation
other
```

---

# Tags

Reusable categorization system.

### Fields

```text
id
name
slug
```

Examples:

```text
wildlife
cleanups
recycling
education
healthcare
renewable-energy
animal-rescue
volunteering
```

---

# Data Status

Used throughout the platform.

### Values

```text
verified
partial
estimated
placeholder
archived
```

---

# Admin System

The platform is managed by trusted Foundation members.

Capabilities:

* Create regions
* Edit regions
* Add metrics
* Add raw data
* Manage conversion rules
* Calculate GHI scores
* Manage entities
* Manage projects
* Manage events
* Manage reports
* Manage sources

No public user accounts are required for Version 1.

---

# Development Priority

Build in the following order:

```text
1. Regions
2. GHI Categories
3. GHI Metrics
4. Conversion Rules
5. Metric Values
6. GHI Scores
7. Entities
8. Projects
9. Events
10. Reports
11. Sources
12. Map Integration
```

The database should always prioritize transparency, traceability, and historical data retention.

Trust. Privacy. Transparency.
