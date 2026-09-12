# Minesweeper Web Application

A high-performance, zero-dependency implementation of the classic Minesweeper game built with modern browser standards (HTML5, CSS3, ES6+).

## System Architecture & Technical Specifications

### Architecture Overview

```
minesweeper/
├── css/
│   └── style.css       # Core design system and layout stylesheets
├── js/
│   └── script.js      # Game loop, state management, and DOM bindings
├── assets/
│   └── screenshot.png  # Project UI preview asset
├── index.html          # Application entry point
└── README.md           # Documentation
```

### Technical Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic structural layout with accessible DOM elements |
| **Styling** | CSS3 | Custom properties, CSS Grid layout engine, Flexbox components |
| **Logic** | JavaScript (ES6+) | Vanilla implementation utilizing Event Delegation and dynamic board state matrices |

## Core Engine & Algorithm Implementation

### Matrix State Representation
The game state is managed using a two-dimensional grid array structure maintaining distinct layers for board state, cell visibility, and user flags:

- **Board Matrix:** Stores numeric values representing adjacent mine counts (`0–8`) or mine indicators (`-1`).
- **Visibility Matrix:** Boolean tracking of revealed coordinates.
- **Flag Matrix:** Boolean tracking of flagged coordinates.

### Flood Fill Recursion
When an unrevealed cell with an adjacent mine count of zero (`0`) is selected, the engine triggers a recursive flood-fill algorithm (Depth-First Search) to evaluate and reveal surrounding zero-value regional blocks until non-zero border perimeters are established.

```
Input: Cell Coordinate (x, y)
1. Check bounds and reveal status; if invalid or already revealed, return.
2. Mark cell (x, y) as revealed.
3. If cell (x, y) adjacent mine count > 0, stop recursion at perimeter.
4. If cell (x, y) adjacent mine count == 0, recurse on all 8 neighboring coordinates.
```

## Features

- **Configurable Grid Parameters:** Flexible board sizing and variable mine distribution densities.
- **Optimized Event Delegation:** Event listeners bound to parent container nodes rather than individual board cells to reduce DOM memory allocation.
- **Context Handling:** Intercepted native context menu events to bind custom flag toggles on right-click actions.
- **Win/Loss Validation Engine:** Real-time state checks executed after every reveal or flag placement action to calculate complete non-mine cell exposure or accurate mine isolation.
- **Overlay State UI:** Native, non-intrusive modal overlays for game termination and victory handling with immediate board reset capability.

## Project Preview

<img width="1366" height="738" alt="Minesweeper Interface Preview" src="https://github.com/user-attachments/assets/7a8ec152-f343-432d-939c-36a3cd7d7847" />

## Deployment & Local Execution

### Prerequisites
A modern ECMAScript 2015+ compliant web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari). No external node packages, bundlers, or runtime environments are required.

### Local Setup Instructions

1. Clone the repository via SSH or HTTPS:
   ```bash
   git clone https://github.com/ferdinaldopelembe/minesweeper.git
   ```

2. Access the root directory:
   ```bash
   cd minesweeper
   ```

3. Launch the application:
   - Direct execution: Open `index.html` directly in any web browser.
   - Local development server (recommended):
     ```bash
     npx serve .
     ```

## Input Mapping & Game Controls

| Action | Control Input | Result |
| :--- | :--- | :--- |
| **Reveal Cell** | `Primary Click (Left-Click)` | Exposes target cell state or triggers explosive game-over condition. |
| **Toggle Flag** | `Secondary Click (Right-Click)` | Toggles target cell flag state to protect or mark suspect coordinates. |
| **Reset Game** | `Modal Overlay / Reset Button` | Re-initializes state matrix and re-renders grid dynamically. |

## License

Distributed under the MIT License. See `LICENSE` file for further information.
