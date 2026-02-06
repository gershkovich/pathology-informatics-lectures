/* ============================================================
   Lecture Widget Library — Polls, Voting, Timers
   Used by the slide engine to instantiate interactive elements
   ============================================================ */

const Widgets = (function () {

    // ─── POLL ────────────────────────────────────────────────
    function createPoll(container, config) {
        const votes = {};
        config.options.forEach(o => votes[o] = 0);
        let total = 0;

        const wrap = document.createElement('div');
        wrap.className = 'poll-container';

        if (config.prompt) {
            const p = document.createElement('p');
            p.className = 'poll-prompt';
            p.style.fontSize = '0.72em';
            p.style.marginBottom = '14px';
            p.style.color = '#555';
            p.textContent = config.prompt;
            wrap.appendChild(p);
        }

        config.options.forEach(opt => {
            const row = document.createElement('div');
            row.className = 'poll-option';
            row.innerHTML =
                '<div class="poll-bar" style="width:0%"></div>' +
                '<span class="poll-label">' + opt + '</span>' +
                '<span class="poll-count">0</span>';
            row.addEventListener('click', function () {
                votes[opt]++;
                total++;
                row.classList.add('selected');
                _updateBars(wrap, votes, total);
            });
            wrap.appendChild(row);
        });

        const resetBtn = document.createElement('button');
        resetBtn.className = 'poll-reset';
        resetBtn.textContent = 'Reset';
        resetBtn.addEventListener('click', function () {
            config.options.forEach(o => votes[o] = 0);
            total = 0;
            wrap.querySelectorAll('.poll-option').forEach(r => {
                r.classList.remove('selected');
                r.querySelector('.poll-bar').style.width = '0%';
                r.querySelector('.poll-count').textContent = '0';
            });
        });
        wrap.appendChild(resetBtn);
        container.appendChild(wrap);
    }

    function _updateBars(wrap, votes, total) {
        wrap.querySelectorAll('.poll-option').forEach(row => {
            const label = row.querySelector('.poll-label').textContent;
            const count = votes[label] || 0;
            const pct = total > 0 ? (count / total * 100) : 0;
            row.querySelector('.poll-bar').style.width = pct + '%';
            row.querySelector('.poll-count').textContent = count;
        });
    }

    // ─── MICRO-CASE VOTING ───────────────────────────────────
    function createVoting(container, config) {
        // Scenario card
        if (config.scenario) {
            const sc = document.createElement('div');
            sc.className = 'scenario-card';
            sc.innerHTML = '<strong>Scenario:</strong> ' + config.scenario;
            container.appendChild(sc);
        }

        // Vote buttons
        const btnsWrap = document.createElement('div');
        btnsWrap.className = 'vote-options';
        config.options.forEach(function (opt, i) {
            const btn = document.createElement('button');
            btn.className = 'vote-btn';
            btn.textContent = opt;
            btn.addEventListener('click', function () {
                btnsWrap.querySelectorAll('.vote-btn').forEach(b => b.classList.remove('voted'));
                btn.classList.add('voted');
            });
            btnsWrap.appendChild(btn);
        });
        container.appendChild(btnsWrap);

        // Discussion reveal
        if (config.discussion && config.discussion.length) {
            const revealBtn = document.createElement('button');
            revealBtn.className = 'reveal-btn';
            revealBtn.textContent = 'Reveal Discussion';

            const revealDiv = document.createElement('div');
            revealDiv.className = 'vote-reveal';
            const ul = document.createElement('ul');
            ul.style.textAlign = 'left';
            ul.style.width = '100%';
            ul.style.margin = '12px 0';
            config.discussion.forEach(function (point) {
                const li = document.createElement('li');
                li.textContent = point;
                ul.appendChild(li);
            });
            revealDiv.appendChild(ul);

            revealBtn.addEventListener('click', function () {
                revealDiv.classList.toggle('shown');
                revealBtn.textContent = revealDiv.classList.contains('shown')
                    ? 'Hide Discussion' : 'Reveal Discussion';
            });

            container.appendChild(revealBtn);
            container.appendChild(revealDiv);
        }

        // Discussion frame note
        if (config.discussionFrame) {
            const note = document.createElement('p');
            note.style.fontSize = '0.6em';
            note.style.color = '#7f8c8d';
            note.style.fontStyle = 'italic';
            note.style.marginTop = '8px';
            note.textContent = config.discussionFrame;
            container.appendChild(note);
        }
    }

    // ─── TIMER ───────────────────────────────────────────────
    function createTimer(container, config) {
        var duration = config.duration || 90;
        var remaining = duration;
        var interval = null;

        if (config.prompt) {
            var p = document.createElement('p');
            p.style.fontSize = '0.7em';
            p.style.marginBottom = '12px';
            p.style.color = '#555';
            p.textContent = config.prompt;
            container.appendChild(p);
        }

        var wrap = document.createElement('div');
        wrap.className = 'timer-container';

        var display = document.createElement('div');
        display.className = 'timer-display';
        display.textContent = _fmt(remaining);

        var controls = document.createElement('div');
        controls.className = 'timer-controls';

        var startBtn = document.createElement('button');
        startBtn.className = 'timer-btn timer-start';
        startBtn.textContent = '\u25B6  Start';

        var resetBtn = document.createElement('button');
        resetBtn.className = 'timer-btn timer-reset-btn';
        resetBtn.textContent = '\u21BA  Reset';

        startBtn.addEventListener('click', function () {
            if (interval) {
                clearInterval(interval); interval = null;
                startBtn.textContent = '\u25B6  Start';
                return;
            }
            startBtn.textContent = '\u275A\u275A Pause';
            interval = setInterval(function () {
                remaining--;
                display.textContent = _fmt(remaining);
                if (remaining <= 15 && remaining > 0) display.className = 'timer-display warning';
                if (remaining <= 0) {
                    clearInterval(interval); interval = null;
                    display.className = 'timer-display expired';
                    display.textContent = "Time\u2019s up!";
                    startBtn.textContent = '\u25B6  Start';
                }
            }, 1000);
        });

        resetBtn.addEventListener('click', function () {
            if (interval) { clearInterval(interval); interval = null; }
            remaining = duration;
            display.className = 'timer-display';
            display.textContent = _fmt(remaining);
            startBtn.textContent = '\u25B6  Start';
        });

        controls.appendChild(startBtn);
        controls.appendChild(resetBtn);
        wrap.appendChild(display);
        wrap.appendChild(controls);
        container.appendChild(wrap);

        // Categories list
        if (config.categories && config.categories.length) {
            var catWrap = document.createElement('div');
            catWrap.style.marginTop = '14px';
            catWrap.style.fontSize = '0.62em';
            catWrap.style.color = '#555';
            catWrap.innerHTML = '<strong>Classify responses into:</strong>';
            var ol = document.createElement('ol');
            ol.style.textAlign = 'left';
            ol.style.maxWidth = '500px';
            ol.style.margin = '6px auto';
            config.categories.forEach(function (cat) {
                var li = document.createElement('li');
                li.textContent = cat;
                ol.appendChild(li);
            });
            catWrap.appendChild(ol);
            container.appendChild(catWrap);
        }
    }

    function _fmt(sec) {
        var m = Math.floor(sec / 60);
        var s = sec % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    // ─── PUBLIC API ──────────────────────────────────────────
    return {
        createPoll: createPoll,
        createVoting: createVoting,
        createTimer: createTimer
    };
})();
