(() => {
    'use strict';

    // ─── Data ────────────────────────────────────────────────────────────────────
    // point: true  → only that exact date is highlighted (colored circle)
    // point: false → pattern fills every date in [start, end] range
    const EVENTS = [
        {
            id: 'e01',
            title: 'First day at IIITD',
            org: 'IIIT-Delhi',
            category: 'academic',
            point: true,
            start: { y: 2024, m: 7, d: 3 },
            end:   { y: 2024, m: 7, d: 3 },
            description: 'Awarded a 25% merit scholarship for the 1st year at IIIT-Delhi, based on overall academic standing at the start of the B.Tech programme.'
        },
        {
            id: 'e02',
            title: 'SWE Intern (AI/ML)',
            org: 'Wildlife Institute of India — CaTRAT',
            category: 'work',
            point: false,
            start: { y: 2024, m: 6, d: 14 },
            end:   { y: 2024, m: 6, d: 25 },
            description: 'Built frontend modules for CaTRAT, an AI-powered camera-trap wildlife image classification system used for tiger conservation. Collaborated with wildlife researchers and ML engineers under Prof. Saket Anand.'
        },
        {
            id: 'wd1',
            title: 'Web Developer',
            org: 'The Vision Lab, IIITD',
            category: 'work',
            point: false,
            start: { y: 2024, m: 7, d: 9 },
            end:   { y: 2024, m: 7, d: 16 },
            description: 'Web Developer for The Vision Lab, IIITD'
        },
        {
            id: 'e03',
            title: 'Software Engineer',
            org: 'TravAcs',
            category: 'work',
            point: false,
            start: { y: 2025, m: 3, d: 29 },
            end:   { y: 2025, m: 6, d: 6 },
            description: 'Architected the official web platform for TravAcs using Flask, Jinja, and HTML/CSS. Enabled accessible digital travel assistance for 100+ visually-impaired users across Delhi NCR, implementing WCAG 2.1 AA compliance throughout.'
        },
        {
            id: 'e04',
            title: 'Founded Unquote',
            org: 'IIIT-Delhi',
            category: 'leadership',
            point: true,
            start: { y: 2025, m: 4, d: 23 },
            end:   { y: 2025, m: 4, d: 23 },
            description: 'Founded and led an official literary and creative writing initiative at IIIT-Delhi. Organises workshops, writing events, and publishes student work alongside a focus on diversity and inclusion.'
        },
        {
            id: 's5h1',
            title: 'Non-Clinical Hospital Intern',
            org: 'Sri Sathya Sai Super Specialty Hospital — Cardiology',
            category: 'work',
            point: false,
            start: { y: 2025, m: 5, d: 9 },
            end:   { y: 2025, m: 5, d: 14 },
            description: 'Volunteered within the Cardiology Department in a high-pressure hospital environment. Deployed an automated token-based workflow to improve patient flow, while also physically assisting with patient management on the floor.'
        },
        {
            id: 's5h2',
            title: 'Non-Clinical Hospital Intern',
            org: 'Sri Sathya Sai Super Specialty Hospital — Cardiology',
            category: 'work',
            point: false,
            start: { y: 2025, m: 6, d: 14 },
            end:   { y: 2025, m: 6, d: 19 },
            description: 'Volunteered within the Cardiology Department in a high-pressure hospital environment. Deployed an automated token-based workflow to improve patient flow, while also physically assisting with patient management on the floor.'
        },
        {
            id: 'e06',
            title: '50% Merit Scholarship',
            org: 'IIIT-Delhi',
            category: 'academic',
            point: true,
            start: { y: 2026, m: 0, d: 14 },
            end:   { y: 2026, m: 0, d: 14 },
            description: 'Scholarship increased to 50% for Semester 3 at IIIT-Delhi based on overall academic standing.'
        },
    ];

    // ─── Constants ───────────────────────────────────────────────────────────────
    const MONTH_NAMES = ['January','February','March','April','May','June',
                         'July','August','September','October','November','December'];
    const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun',
                         'Jul','Aug','Sep','Oct','Nov','Dec'];
    const WEEKDAYS    = ['Mo','Tu','We','Th','Fr','Sa','Su'];

    // Single-event patterns
    const PATTERNS = {
        work: `repeating-linear-gradient(
            90deg,
            rgba(96,165,250,0.45) 0px, rgba(96,165,250,0.45) 2.5px,
            transparent 2.5px, transparent 8px
        )`,
        academic: `repeating-linear-gradient(
            0deg,
            rgba(74,222,128,0.45) 0px, rgba(74,222,128,0.45) 2.5px,
            transparent 2.5px, transparent 8px
        )`,
        leadership: `radial-gradient(circle, rgba(250,204,21,0.65) 2px, transparent 2px)`,
    };

    const PATTERN_SIZES = {
        work:       '100% 100%',
        academic:   '100% 100%',
        leadership: '8px 8px',
    };

    // Same-type overlap patterns — cross-hatch (diagonal) for visual distinction
    const PATTERNS_DOUBLE = {
        work: `repeating-linear-gradient(
            45deg,
            rgba(96,165,250,0.65) 0px, rgba(96,165,250,0.65) 2.5px,
            transparent 2.5px, transparent 7px
        )`,
        academic: `repeating-linear-gradient(
            45deg,
            rgba(74,222,128,0.65) 0px, rgba(74,222,128,0.65) 2.5px,
            transparent 2.5px, transparent 7px
        )`,
        leadership: `radial-gradient(circle, rgba(250,204,21,0.88) 3px, transparent 3px)`,
    };

    const PATTERN_SIZES_DOUBLE = {
        work:       '100% 100%',
        academic:   '100% 100%',
        leadership: '9px 9px',
    };

    // Pick the right pattern for a category given how many events of that type are on the cell
    function patternFor(category, count) {
        return count > 1 ? PATTERNS_DOUBLE[category] : PATTERNS[category];
    }

    function patternSizeFor(category, count) {
        return count > 1 ? PATTERN_SIZES_DOUBLE[category] : PATTERN_SIZES[category];
    }

    const TOP_BAR_COLORS = {
        work:       '#3b82f6',
        academic:   '#22c55e',
        leadership: '#f59e0b',
    };

    const POINT_COLORS = {
        work:       '#3b82f6',
        academic:   '#22c55e',
        leadership: '#f59e0b',
    };

    // ─── Compute months with events ───────────────────────────────────────────────
    function buildEventMonths() {
        const set = new Set();
        EVENTS.forEach(ev => {
            let y = ev.start.y, m = ev.start.m;
            const endY = ev.end.y, endM = ev.end.m;
            while (y < endY || (y === endY && m <= endM)) {
                set.add(`${y}-${m}`);
                m++;
                if (m > 11) { m = 0; y++; }
            }
        });
        return [...set]
            .map(k => { const [y, m] = k.split('-').map(Number); return { y, m }; })
            .sort((a, b) => a.y !== b.y ? a.y - b.y : a.m - b.m);
    }

    const EVENT_MONTHS = buildEventMonths();

    function getMonthIndex(y, m) {
        return EVENT_MONTHS.findIndex(e => e.y === y && e.m === m);
    }

    // ─── State ───────────────────────────────────────────────────────────────────
    // Start on the most recent month with events
    const lastMonth = EVENT_MONTHS[EVENT_MONTHS.length - 1];
    let state = {
        year:        lastMonth.y,
        month:       lastMonth.m,
        selectedId:  null,   // selected event id
        isAnimating: false,
        jpYear:      lastMonth.y,
    };

    // ─── DOM refs ────────────────────────────────────────────────────────────────
    const viewport      = document.getElementById('cal-viewport');
    const detailPanel   = document.getElementById('detail-panel');
    const monthTrigger  = document.getElementById('cal-month-trigger');
    const yearTrigger   = document.getElementById('cal-year-trigger');
    const prevBtn       = document.getElementById('cal-prev');
    const nextBtn       = document.getElementById('cal-next');
    const jumpPicker    = document.getElementById('jump-picker');
    const jpYearLabel   = document.getElementById('jp-year-label');
    const jpGrid        = document.getElementById('jp-months-grid');
    const jpPrevYear    = document.getElementById('jp-prev-year');
    const jpNextYear    = document.getElementById('jp-next-year');
    const jpClose       = document.getElementById('jp-close');
    const mobileSheet   = document.getElementById('mobile-sheet');
    const sheetBody     = document.getElementById('sheet-body');
    const sheetBackdrop = document.getElementById('sheet-backdrop');

    // ─── Date helpers ────────────────────────────────────────────────────────────
    function daysInMonth(y, m) {
        return new Date(y, m + 1, 0).getDate();
    }

    function firstDayOfWeek(y, m) {
        // getDay() returns 0=Sun … 6=Sat. We want 0=Mon … 6=Sun.
        return (new Date(y, m, 1).getDay() + 6) % 7;
    }

    function toTimestamp(y, m, d) {
        return new Date(y, m, d).getTime();
    }

    function eventCoversDay(ev, y, m, d) {
        const cell  = toTimestamp(y, m, d);
        const start = toTimestamp(ev.start.y, ev.start.m, ev.start.d);
        const end   = toTimestamp(ev.end.y,   ev.end.m,   ev.end.d);
        return cell >= start && cell <= end;
    }

    function getEventsForDay(y, m, d) {
        return EVENTS.filter(ev => eventCoversDay(ev, y, m, d));
    }

    function getEventsForMonth(y, m) {
        // Unique events that touch this month at all
        const seen = new Set();
        const result = [];
        for (let d = 1; d <= daysInMonth(y, m); d++) {
            getEventsForDay(y, m, d).forEach(ev => {
                if (!seen.has(ev.id)) {
                    seen.add(ev.id);
                    result.push(ev);
                }
            });
        }
        return result;
    }

    function isEventStartDay(ev, y, m, d) {
        return ev.start.y === y && ev.start.m === m && ev.start.d === d;
    }

    // ─── Build grid ──────────────────────────────────────────────────────────────
    function buildGrid(y, m) {
        const grid = document.createElement('div');
        grid.className = 'cal-grid';

        // Weekday row
        const wdRow = document.createElement('div');
        wdRow.className = 'cal-weekdays';
        wdRow.setAttribute('aria-hidden', 'true');
        WEEKDAYS.forEach(wd => {
            const cell = document.createElement('div');
            cell.className = 'cal-weekday';
            cell.textContent = wd;
            wdRow.appendChild(cell);
        });
        grid.appendChild(wdRow);

        // Days
        const days = document.createElement('div');
        days.className = 'cal-days';
        days.setAttribute('role', 'grid');
        days.setAttribute('aria-label', `${MONTH_NAMES[m]} ${y}`);

        const firstDay  = firstDayOfWeek(y, m);
        const totalDays = daysInMonth(y, m);
        const today     = new Date();

        // Empty padding cells
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-day empty';
            empty.setAttribute('aria-hidden', 'true');
            days.appendChild(empty);
        }

        for (let d = 1; d <= totalDays; d++) {
            const cell = document.createElement('div');
            cell.className = 'cal-day';
            cell.setAttribute('role', 'gridcell');

            const eventsHere  = getEventsForDay(y, m, d);
            const rangeEvents = eventsHere.filter(ev => !ev.point);
            const pointEvents = eventsHere.filter(ev => ev.point);

            const isToday = (today.getFullYear() === y &&
                             today.getMonth()    === m &&
                             today.getDate()     === d);

            if (eventsHere.length) {
                cell.classList.add('has-event');
                cell.setAttribute('tabindex', '0');
                cell.setAttribute('aria-label',
                    `${d} ${MONTH_NAMES[m]}, ${eventsHere.length} event${eventsHere.length > 1 ? 's' : ''}`);
                cell.dataset.date = `${y}-${m}-${d}`;

                // Apply range pattern backgrounds
                if (rangeEvents.length) {
                    const types = [...new Set(rangeEvents.map(e => e.category))];
                    const layers = types.map(t => {
                        const count = rangeEvents.filter(e => e.category === t).length;
                        return patternFor(t, count);
                    });
                    const sizes = types.map(t => {
                        const count = rangeEvents.filter(e => e.category === t).length;
                        return patternSizeFor(t, count);
                    });
                    cell.style.backgroundImage  = layers.join(', ');
                    cell.style.backgroundSize   = sizes.join(', ');
                    cell.style.backgroundRepeat = 'repeat';

                    // Start-of-range triangle marker
                    const hasStart = rangeEvents.some(ev => isEventStartDay(ev, y, m, d));
                    if (hasStart) cell.classList.add('event-start');
                }

                // Check if this cell is part of the selected event
                if (state.selectedId && eventsHere.some(ev => ev.id === state.selectedId)) {
                    cell.classList.add('selected');
                }

                cell.addEventListener('click', () => handleDayClick(eventsHere));
                cell.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleDayClick(eventsHere);
                    }
                });

                // Date number
                const num = document.createElement('span');
                num.className = 'cal-day-num';
                num.textContent = String(d);
                cell.appendChild(num);

                // Point event circles (rendered on top of number)
                pointEvents.forEach(ev => {
                    const circle = document.createElement('span');
                    circle.className = 'point-event-circle';
                    circle.style.setProperty('--point-color', POINT_COLORS[ev.category]);
                    cell.appendChild(circle);
                });

            } else {
                cell.classList.add('muted');
                cell.setAttribute('aria-label', `${d} ${MONTH_NAMES[m]}`);
                const num = document.createElement('span');
                num.className = 'cal-day-num';
                num.textContent = String(d);
                cell.appendChild(num);
            }

            if (isToday) {
                cell.classList.add('today');
                cell.setAttribute('aria-current', 'date');
            }

            days.appendChild(cell);
        }

        grid.appendChild(days);
        return grid;
    }

    // ─── Slide between months ────────────────────────────────────────────────────
    // Fixed-height animation: the viewport has a set height in CSS.
    // We absolutely position old and new grids side-by-side and translate.
    function renderMonth(y, m, direction) {
        monthTrigger.textContent = MONTH_NAMES[m];
        yearTrigger.textContent  = String(y);

        const idx = getMonthIndex(y, m);
        prevBtn.disabled = (idx <= 0);
        nextBtn.disabled = (idx >= EVENT_MONTHS.length - 1);

        const newGrid = buildGrid(y, m);
        const oldGrid = viewport.querySelector('.cal-grid');

        if (!direction || !oldGrid) {
            viewport.innerHTML = '';
            viewport.appendChild(newGrid);
            renderMonthPanel(y, m);
            return;
        }

        state.isAnimating = true;

        // Lock viewport height to its current rendered height to prevent collapse
        viewport.style.height = viewport.offsetHeight + 'px';

        // Position both grids
        oldGrid.style.position   = 'absolute';
        oldGrid.style.top        = '0';
        oldGrid.style.left       = '0';
        oldGrid.style.width      = '100%';

        newGrid.style.position   = 'absolute';
        newGrid.style.top        = '0';
        newGrid.style.width      = '100%';
        newGrid.style.left       = direction === 'next' ? '100%' : '-100%';

        viewport.style.position  = 'relative';
        viewport.style.overflow  = 'hidden';
        viewport.appendChild(newGrid);

        // Force reflow before animating
        newGrid.getBoundingClientRect();

        const DURATION = 300;
        const easing   = 'cubic-bezier(0.4, 0, 0.2, 1)';
        const shift    = direction === 'next' ? '-100%' : '100%';

        oldGrid.style.transition = `transform ${DURATION}ms ${easing}`;
        newGrid.style.transition = `transform ${DURATION}ms ${easing}`;

        oldGrid.style.transform  = `translateX(${shift})`;
        newGrid.style.transform  = 'translateX(0)';

        setTimeout(() => {
            oldGrid.remove();
            newGrid.style.position   = '';
            newGrid.style.top        = '';
            newGrid.style.left       = '';
            newGrid.style.width      = '';
            newGrid.style.transform  = '';
            newGrid.style.transition = '';
            viewport.style.height    = '';
            viewport.style.position  = '';
            viewport.style.overflow  = '';
            state.isAnimating = false;
        }, DURATION + 20);

        renderMonthPanel(y, m);
    }

    // ─── Navigation (events-only months) ────────────────────────────────────────
    function navigate(delta) {
        if (state.isAnimating) return;
        const idx    = getMonthIndex(state.year, state.month);
        const newIdx = idx + delta;
        if (newIdx < 0 || newIdx >= EVENT_MONTHS.length) return;

        state.year       = EVENT_MONTHS[newIdx].y;
        state.month      = EVENT_MONTHS[newIdx].m;
        state.selectedId = null;
        renderMonth(state.year, state.month, delta > 0 ? 'next' : 'prev');
    }

    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // ─── Right panel: month event list ───────────────────────────────────────────
    function formatDateRange(ev) {
        const sd = `${ev.start.d} ${MONTH_SHORT[ev.start.m]} ${ev.start.y}`;
        const ed = `${ev.end.d} ${MONTH_SHORT[ev.end.m]} ${ev.end.y}`;
        return sd === ed ? sd : `${sd} – ${ed}`;
    }

    function renderMonthPanel(y, m) {
        const events = getEventsForMonth(y, m);
        detailPanel.innerHTML = '';

        if (!events.length) {
            const empty = document.createElement('div');
            empty.className = 'detail-empty';
            empty.innerHTML = `
                <div class="detail-empty-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="3"/>
                        <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                </div>
                <p>No events this month</p>`;
            detailPanel.appendChild(empty);
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'month-panel';

        const heading = document.createElement('div');
        heading.className = 'month-panel-heading';
        heading.textContent = `${MONTH_NAMES[m]} ${y}`;
        wrapper.appendChild(heading);

        const list = document.createElement('div');
        list.className = 'month-event-list';

        events.forEach(ev => {
            const item = document.createElement('div');
            item.className = 'month-event-item';
            item.dataset.evId = ev.id;
            if (state.selectedId === ev.id) item.classList.add('expanded');

            // Top accent bar
            const bar = document.createElement('div');
            bar.className = 'mev-bar';
            bar.style.background = TOP_BAR_COLORS[ev.category];
            item.appendChild(bar);

            // Summary row (always visible)
            const summary = document.createElement('div');
            summary.className = 'mev-summary';

            const badge = document.createElement('span');
            badge.className = `mev-badge badge-${ev.category}`;
            badge.textContent =
                ev.category === 'work'       ? 'Work' :
                ev.category === 'academic'   ? 'Academic' : 'Leadership';
            summary.appendChild(badge);

            const title = document.createElement('span');
            title.className = 'mev-title';
            title.textContent = ev.title;
            summary.appendChild(title);

            const chevron = document.createElement('span');
            chevron.className = 'mev-chevron';
            chevron.setAttribute('aria-hidden', 'true');
            chevron.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>`;
            summary.appendChild(chevron);

            item.appendChild(summary);

            // Expanded detail (hidden by default)
            const detail = document.createElement('div');
            detail.className = 'mev-detail';

            const org = document.createElement('p');
            org.className = 'mev-org';
            org.textContent = ev.org;
            detail.appendChild(org);

            const range = document.createElement('p');
            range.className = 'mev-range';
            range.textContent = formatDateRange(ev);
            detail.appendChild(range);

            const desc = document.createElement('p');
            desc.className = 'mev-desc';
            desc.textContent = ev.description;
            detail.appendChild(desc);

            item.appendChild(detail);

            // Toggle on click
            item.addEventListener('click', () => {
                const isOpen = item.classList.contains('expanded');

                // Collapse all
                list.querySelectorAll('.month-event-item.expanded')
                    .forEach(el => el.classList.remove('expanded'));

                if (!isOpen) {
                    item.classList.add('expanded');
                    state.selectedId = ev.id;
                    highlightEventCells(ev.id);
                } else {
                    state.selectedId = null;
                    clearHighlightedCells();
                }
            });

            list.appendChild(item);
        });

        wrapper.appendChild(list);
        detailPanel.appendChild(wrapper);
    }

    // ─── Cell highlighting ────────────────────────────────────────────────────────
    function highlightEventCells(evId) {
        clearHighlightedCells();
        const ev = EVENTS.find(e => e.id === evId);
        if (!ev) return;
        viewport.querySelectorAll('.cal-day[data-date]').forEach(cell => {
            const [y, m, d] = cell.dataset.date.split('-').map(Number);
            if (eventCoversDay(ev, y, m, d)) cell.classList.add('selected');
        });
    }

    function clearHighlightedCells() {
        viewport.querySelectorAll('.cal-day.selected')
            .forEach(c => c.classList.remove('selected'));
    }

    // ─── Day click → expand corresponding panel item ──────────────────────────────
    function handleDayClick(events) {
        if (!events.length) return;

        // If multiple events on one day, pick the first unselected, or cycle
        const firstEv = events[0];
        const isMobile = window.innerWidth <= 900;

        if (isMobile) {
            // Show sheet with event list for day
            sheetBody.innerHTML = '';
            const content = buildSheetContent(events);
            sheetBody.appendChild(content);
            openSheet();
        } else {
            // Expand that event in the right panel
            const item = detailPanel.querySelector(`.month-event-item[data-ev-id="${firstEv.id}"]`);
            if (!item) return;

            const isOpen = item.classList.contains('expanded');
            detailPanel.querySelectorAll('.month-event-item.expanded')
                .forEach(el => el.classList.remove('expanded'));

            if (!isOpen) {
                item.classList.add('expanded');
                state.selectedId = firstEv.id;
                highlightEventCells(firstEv.id);
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                state.selectedId = null;
                clearHighlightedCells();
            }
        }
    }

    // ─── Mobile sheet ─────────────────────────────────────────────────────────────
    function buildSheetContent(events) {
        const wrap = document.createElement('div');
        events.forEach(ev => {
            const card = document.createElement('div');
            card.className = 'month-event-item expanded';

            const bar = document.createElement('div');
            bar.className = 'mev-bar';
            bar.style.background = TOP_BAR_COLORS[ev.category];
            card.appendChild(bar);

            const body = document.createElement('div');
            body.className = 'mev-detail';
            body.style.display = 'block';

            const badge = document.createElement('span');
            badge.className = `mev-badge badge-${ev.category}`;
            badge.textContent =
                ev.category === 'work'       ? 'Work' :
                ev.category === 'academic'   ? 'Academic' : 'Leadership';
            body.appendChild(badge);

            const t = document.createElement('p');
            t.className = 'mev-title';
            t.style.fontSize = '1.1rem';
            t.style.margin   = '0.4rem 0';
            t.textContent    = ev.title;
            body.appendChild(t);

            const o = document.createElement('p');
            o.className  = 'mev-org';
            o.textContent = ev.org;
            body.appendChild(o);

            const r = document.createElement('p');
            r.className  = 'mev-range';
            r.textContent = formatDateRange(ev);
            body.appendChild(r);

            const d = document.createElement('p');
            d.className  = 'mev-desc';
            d.textContent = ev.description;
            body.appendChild(d);

            card.appendChild(body);
            wrap.appendChild(card);
        });
        return wrap;
    }

    function openSheet() {
        mobileSheet.classList.add('open');
        sheetBackdrop.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeSheet() {
        mobileSheet.classList.remove('open');
        sheetBackdrop.classList.remove('visible');
        document.body.style.overflow = '';
    }

    sheetBackdrop.addEventListener('click', closeSheet);
    mobileSheet.querySelector('.sheet-handle-wrap').addEventListener('click', closeSheet);

    // ─── Jump picker ─────────────────────────────────────────────────────────────
    function openJumpPicker() {
        state.jpYear = state.year;
        renderJumpPicker();
        jumpPicker.classList.remove('hidden');
        jumpPicker.removeAttribute('hidden');
    }

    function closeJumpPicker() {
        jumpPicker.classList.add('hidden');
        jumpPicker.setAttribute('hidden', '');
    }

    function renderJumpPicker() {
        jpYearLabel.textContent = String(state.jpYear);

        const allYears = [...new Set(EVENT_MONTHS.map(e => e.y))].sort((a, b) => a - b);
        jpPrevYear.disabled = (state.jpYear <= allYears[0]);
        jpNextYear.disabled = (state.jpYear >= allYears[allYears.length - 1]);

        jpGrid.innerHTML = '';
        MONTH_SHORT.forEach((name, mi) => {
            const btn      = document.createElement('button');
            btn.className  = 'jp-month-btn';
            btn.setAttribute('role', 'listitem');
            btn.textContent = name;

            const hasEvt   = EVENT_MONTHS.some(e => e.y === state.jpYear && e.m === mi);
            const isCurrent = (state.jpYear === state.year && mi === state.month);

            if (!hasEvt) {
                btn.disabled = true;
            } else if (isCurrent) {
                btn.classList.add('current');
            } else {
                btn.classList.add('has-events');
                btn.addEventListener('click', () => {
                    const direction = (state.jpYear > state.year ||
                        (state.jpYear === state.year && mi > state.month)) ? 'next' : 'prev';
                    state.year       = state.jpYear;
                    state.month      = mi;
                    state.selectedId = null;
                    renderMonth(state.year, state.month, direction);
                    closeJumpPicker();
                });
            }

            jpGrid.appendChild(btn);
        });
    }

    monthTrigger.addEventListener('click', openJumpPicker);
    yearTrigger.addEventListener('click',  openJumpPicker);

    jpPrevYear.addEventListener('click', () => {
        const allYears = [...new Set(EVENT_MONTHS.map(e => e.y))].sort((a, b) => a - b);
        if (state.jpYear > allYears[0]) { state.jpYear--; renderJumpPicker(); }
    });
    jpNextYear.addEventListener('click', () => {
        const allYears = [...new Set(EVENT_MONTHS.map(e => e.y))].sort((a, b) => a - b);
        if (state.jpYear < allYears[allYears.length - 1]) { state.jpYear++; renderJumpPicker(); }
    });

    jpClose.addEventListener('click', closeJumpPicker);
    jumpPicker.addEventListener('click', e => { if (e.target === jumpPicker) closeJumpPicker(); });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeJumpPicker(); closeSheet(); }
    });

    // ─── Init ────────────────────────────────────────────────────────────────────
    renderMonth(state.year, state.month, null);

})();