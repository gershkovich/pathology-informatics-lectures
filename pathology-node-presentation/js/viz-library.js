/* ============================================================
   Lecture Visualization Library — D3.js visualizations
   Each function takes a container DOM element and optional config
   ============================================================ */

const VizLibrary = (function () {

    // ─── WORKFLOW PIPELINE (three-phase) ─────────────────────
    function workflowPipeline(container, config) {
        var W = 1050, H = 340;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var phases = (config && config.phases) || [
            { label: 'Pre-Analytical', color: '#3498db',
              steps: ['Order', 'Collection', 'Labeling', 'Accessioning'] },
            { label: 'Analytical', color: '#27ae60',
              steps: ['Grossing', 'Processing', 'Slide Creation', 'Staining'] },
            { label: 'Post-Analytical', color: '#9b59b6',
              steps: ['Interpretation', 'Reporting', 'Distribution', 'Follow-up'] }
        ];

        var phaseW = 330, gap = 24, stepH = 36, stepGap = 8;
        var stepW = phaseW - 30;

        phases.forEach(function (phase, pi) {
            var px = pi * (phaseW + gap) + 12;
            var g = svg.append('g').style('opacity', 0);

            g.append('rect').attr('x', px).attr('y', 0)
                .attr('width', phaseW).attr('height', H - 10)
                .attr('rx', 12).attr('fill', phase.color).attr('fill-opacity', 0.08)
                .attr('stroke', phase.color).attr('stroke-opacity', 0.3).attr('stroke-width', 1.5);

            g.append('text').attr('x', px + phaseW / 2).attr('y', 30)
                .attr('text-anchor', 'middle').attr('font-size', '15px')
                .attr('font-weight', '700').attr('fill', phase.color)
                .text(phase.label);

            phase.steps.forEach(function (step, si) {
                var sx = px + 15;
                var sy = 50 + si * (stepH + stepGap);

                g.append('rect').attr('x', sx).attr('y', sy)
                    .attr('width', stepW).attr('height', stepH)
                    .attr('rx', 8).attr('fill', 'white')
                    .attr('stroke', phase.color).attr('stroke-width', 1.5);

                g.append('text').attr('x', sx + stepW / 2).attr('y', sy + stepH / 2 + 5)
                    .attr('text-anchor', 'middle').attr('font-size', '13px')
                    .attr('fill', '#0e6e8c').text(step);

                if (si < phase.steps.length - 1) {
                    var ay = sy + stepH + 2;
                    g.append('path')
                        .attr('d', 'M' + (sx + stepW / 2 - 5) + ',' + ay +
                              ' L' + (sx + stepW / 2) + ',' + (ay + stepGap - 2) +
                              ' L' + (sx + stepW / 2 + 5) + ',' + ay)
                        .attr('fill', phase.color).attr('opacity', 0.5);
                }
            });

            g.transition().delay(pi * 400).duration(600).style('opacity', 1);
        });

        for (var i = 0; i < 2; i++) {
            var ax = (i + 1) * (phaseW + gap) - gap / 2 + 12;
            svg.append('text').attr('x', ax).attr('y', H / 2)
                .attr('text-anchor', 'middle').attr('font-size', '24px')
                .attr('fill', '#bdc3c7').text('\u2192')
                .style('opacity', 0)
                .transition().delay(800 + i * 300).duration(400).style('opacity', 1);
        }
    }

    // ─── ABSTRACTION LAYERS (car analogy) ────────────────────
    function abstractionLayers(container, config) {
        var W = 1000, H = 420;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var layerH = 56, gap = 10, colW = 420;
        var topStart = 44;                          // y where layer boxes begin
        var topEnd = topStart + 2 * layerH + gap;   // bottom of 2nd layer box
        var annotY = topEnd + 26;                    // "FOCUS HERE" text baseline
        var botStart = annotY + 18;                  // top of 3rd layer box

        var carLayers = [
            { label: 'Driver', sub: 'Where you want to go, how fast', color: '#2980b9' },
            { label: 'Controls', sub: 'Steering, pedals, dashboard', color: '#3498db' },
            { label: 'Drivetrain', sub: 'Engine, transmission, electronics', color: '#5dade2' },
            { label: 'Components', sub: 'Chips, sensors, fuel injectors', color: '#85c1e9' }
        ];
        var pathLayers = [
            { label: 'Pathologist', sub: 'Diagnosis, workflow decisions', color: '#27ae60' },
            { label: 'Workflow & Logic', sub: 'Rules, validations, distribution', color: '#2ecc71' },
            { label: 'Systems', sub: 'LIS, viewers, interfaces, middleware', color: '#58d68d' },
            { label: 'Infrastructure', sub: 'Servers, CPUs, networks, storage', color: '#82e0aa' }
        ];

        // Focus bracket — covers the top two layers
        var bracketTop = topStart - 8;
        var bracketH = topEnd - bracketTop + 8;
        svg.append('rect').attr('x', 0).attr('y', bracketTop)
            .attr('width', W).attr('height', bracketH)
            .attr('rx', 14).attr('fill', 'rgba(41,128,185,0.06)')
            .attr('stroke', '#2980b9').attr('stroke-dasharray', '6,4')
            .attr('stroke-width', 1.5);

        // Annotation line + text between top and bottom layers
        svg.append('line')
            .attr('x1', 40).attr('x2', W - 40)
            .attr('y1', annotY - 10).attr('y2', annotY - 10)
            .attr('stroke', '#2980b9').attr('stroke-width', 1)
            .attr('stroke-dasharray', '4,3').attr('opacity', 0.5);

        svg.append('text').attr('x', W / 2).attr('y', annotY + 4)
            .attr('text-anchor', 'middle').attr('font-size', '13px')
            .attr('fill', '#2980b9').attr('font-weight', '600')
            .text('\u25B2 FOCUS HERE \u2014 the abstraction layers that matter for clinical practice');

        function drawCol(layers, xOff, title, emoji) {
            var g = svg.append('g');
            g.append('text').attr('x', xOff + colW / 2).attr('y', 28)
                .attr('text-anchor', 'middle').attr('font-size', '15px')
                .attr('font-weight', '700').attr('fill', '#0e6e8c')
                .text(emoji + '  ' + title);

            layers.forEach(function (layer, i) {
                // Top 2 layers above annotation, bottom 2 below
                var y = i < 2
                    ? topStart + i * (layerH + gap)
                    : botStart + (i - 2) * (layerH + gap);

                var lg = g.append('g').style('opacity', 0);

                lg.append('rect').attr('x', xOff).attr('y', y)
                    .attr('width', colW).attr('height', layerH)
                    .attr('rx', 10).attr('fill', layer.color).attr('fill-opacity', 0.15)
                    .attr('stroke', layer.color).attr('stroke-width', 2);

                lg.append('text').attr('x', xOff + 18).attr('y', y + 24)
                    .attr('font-size', '15px').attr('font-weight', '700')
                    .attr('fill', layer.color).text(layer.label);

                lg.append('text').attr('x', xOff + 18).attr('y', y + 43)
                    .attr('font-size', '12px').attr('fill', '#555').text(layer.sub);

                var targetOpacity = i < 2 ? 1.0 : 0.35;
                lg.transition().delay(i * 250 + 200).duration(500).style('opacity', targetOpacity);
            });
        }

        drawCol(carLayers, 20, 'Driving a Car', '\uD83D\uDE97');
        drawCol(pathLayers, W - colW - 20, 'Practicing Pathology', '\uD83D\uDD2C');

        // Equivalence symbol between columns (vertically centered on top layers)
        var eqY = topStart + layerH + gap / 2;
        svg.append('text').attr('x', W / 2).attr('y', eqY + 6)
            .attr('text-anchor', 'middle').attr('font-size', '30px')
            .attr('fill', '#bdc3c7').text('\u2248');
    }

    // ─── SYSTEMS ECOSYSTEM ───────────────────────────────────
    function systemsEcosystem(container, config) {
        var W = 950, H = 420;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var nodes = [
            { id: 'LIS', label: 'LIS', r: 44, color: '#2980b9' },
            { id: 'scanners', label: 'Instrument\nInterfaces', r: 30, color: '#27ae60' },
            { id: 'imaging', label: 'Image Mgmt\n/ Viewer', r: 30, color: '#8e44ad' },
            { id: 'dictation', label: 'Dictation &\nReporting', r: 30, color: '#e67e22' },
            { id: 'middleware', label: 'Middleware', r: 28, color: '#16a085' },
            { id: 'portals', label: 'Portals /\nDashboards', r: 28, color: '#2c3e50' },
            { id: 'warehouse', label: 'Data\nWarehouse', r: 30, color: '#c0392b' },
            { id: 'messaging', label: 'Messaging /\nNotifications', r: 28, color: '#f39c12' },
            { id: 'ai', label: 'AI / ML\nModels', r: 28, color: '#e74c3c' }
        ];

        var links = [
            { source: 'LIS', target: 'scanners' },
            { source: 'LIS', target: 'imaging' },
            { source: 'LIS', target: 'dictation' },
            { source: 'LIS', target: 'middleware' },
            { source: 'LIS', target: 'portals' },
            { source: 'LIS', target: 'warehouse' },
            { source: 'LIS', target: 'messaging' },
            { source: 'LIS', target: 'ai' },
            { source: 'imaging', target: 'ai' },
            { source: 'warehouse', target: 'ai' },
            { source: 'middleware', target: 'scanners' }
        ];

        var cx = W / 2, cy = H / 2, radius = 170;
        nodes[0].x = cx; nodes[0].y = cy;
        var outer = nodes.slice(1);
        outer.forEach(function (n, i) {
            var angle = (i / outer.length) * 2 * Math.PI - Math.PI / 2;
            n.x = cx + radius * Math.cos(angle);
            n.y = cy + radius * Math.sin(angle);
        });

        var nodeMap = {};
        nodes.forEach(function (n) { nodeMap[n.id] = n; });

        svg.selectAll('.eco-link')
            .data(links).enter()
            .append('line')
            .attr('x1', function (d) { return nodeMap[d.source].x; })
            .attr('y1', function (d) { return nodeMap[d.source].y; })
            .attr('x2', function (d) { return nodeMap[d.target].x; })
            .attr('y2', function (d) { return nodeMap[d.target].y; })
            .attr('stroke', '#bdc3c7').attr('stroke-width', 2)
            .style('opacity', 0)
            .transition().delay(function (d, i) { return 300 + i * 80; }).duration(400)
            .style('opacity', 0.4);

        var nodeGs = svg.selectAll('.eco-node')
            .data(nodes).enter()
            .append('g')
            .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .style('opacity', 0);

        nodeGs.append('circle')
            .attr('r', function (d) { return d.r; })
            .attr('fill', function (d) { return d.color; }).attr('fill-opacity', 0.15)
            .attr('stroke', function (d) { return d.color; }).attr('stroke-width', 2.5);

        nodeGs.each(function (d) {
            var lines = d.label.split('\n');
            var g = d3.select(this);
            lines.forEach(function (line, i) {
                g.append('text')
                    .attr('y', (i - (lines.length - 1) / 2) * 13 + 4)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', d.id === 'LIS' ? '16px' : '10px')
                    .attr('font-weight', d.id === 'LIS' ? '800' : '600')
                    .attr('fill', d.color)
                    .text(line);
            });
        });

        nodeGs.transition().delay(function (d, i) { return i * 150; }).duration(500)
            .style('opacity', 1);
    }

    // ─── AI MATURITY LADDER ──────────────────────────────────
    function aiMaturityLadder(container, config) {
        var W = 950, H = 360;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var levels = [
            { label: 'Level IV: Integrated Decision Support', sub: 'Differential generation, risk stratification', color: '#8e44ad', icon: '\uD83E\uDDE0' },
            { label: 'Level III: Assistive AI', sub: 'Flagging, quantification, draft reports', color: '#e74c3c', icon: '\uD83E\uDD16' },
            { label: 'Level II: Real-time QA & Safety', sub: 'Mismatch detection, missing fields, hard stops', color: '#f39c12', icon: '\uD83D\uDEE1\uFE0F' },
            { label: 'Level I: Retrospective Analytics', sub: 'TAT reports, volumes, trends', color: '#27ae60', icon: '\uD83D\uDCCA' }
        ];

        var stepH = 68, baseW = 860, narrowing = 100;

        levels.forEach(function (level, i) {
            var w = baseW - i * narrowing;
            var x = (W - w) / 2;
            var y = H - (levels.length - i) * (stepH + 6);

            var g = svg.append('g').style('opacity', 0);

            g.append('rect').attr('x', x).attr('y', y)
                .attr('width', w).attr('height', stepH)
                .attr('rx', 10).attr('fill', level.color).attr('fill-opacity', 0.12)
                .attr('stroke', level.color).attr('stroke-width', 2);

            g.append('text').attr('x', x + 44).attr('y', y + 30)
                .attr('font-size', '14px').attr('font-weight', '700')
                .attr('fill', level.color).text(level.label);

            g.append('text').attr('x', x + 44).attr('y', y + 50)
                .attr('font-size', '11px').attr('fill', '#555').text(level.sub);

            g.append('text').attr('x', x + 18).attr('y', y + 40)
                .attr('font-size', '20px').text(level.icon);

            g.transition().delay((levels.length - 1 - i) * 350).duration(500).style('opacity', 1);
        });
    }

    // ─── DATA FLOW PIPELINE ──────────────────────────────────
    function dataFlow(container, config) {
        var W = 1000, H = 160;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var steps = ['Capture', 'Map', 'Store', 'Clean', 'Present', 'Interpret', 'Act'];
        var colors = ['#3498db', '#2980b9', '#1abc9c', '#27ae60', '#f39c12', '#e67e22', '#e74c3c'];
        var stepW = 110, gapX = 18;
        var startX = (W - steps.length * (stepW + gapX) + gapX) / 2;

        steps.forEach(function (step, i) {
            var x = startX + i * (stepW + gapX);
            var g = svg.append('g').style('opacity', 0);

            g.append('rect').attr('x', x).attr('y', 30)
                .attr('width', stepW).attr('height', 50)
                .attr('rx', 10).attr('fill', colors[i]).attr('fill-opacity', 0.15)
                .attr('stroke', colors[i]).attr('stroke-width', 2);

            g.append('text').attr('x', x + stepW / 2).attr('y', 60)
                .attr('text-anchor', 'middle').attr('font-size', '13px')
                .attr('font-weight', '600').attr('fill', colors[i]).text(step);

            if (i < steps.length - 1) {
                g.append('text').attr('x', x + stepW + gapX / 2).attr('y', 60)
                    .attr('text-anchor', 'middle').attr('font-size', '18px')
                    .attr('fill', '#bdc3c7').text('\u2192');
            }

            if (i > 0 && i < steps.length - 1) {
                g.append('text').attr('x', x - gapX / 2).attr('y', 105)
                    .attr('text-anchor', 'middle').attr('font-size', '9px')
                    .attr('fill', '#e74c3c').attr('font-weight', '600').text('\u26A0 interface');
            }

            g.transition().delay(i * 180).duration(400).style('opacity', 1);
        });

        svg.append('text').attr('x', W / 2).attr('y', 140)
            .attr('text-anchor', 'middle').attr('font-size', '11px')
            .attr('fill', '#e74c3c').attr('font-style', 'italic')
            .text('Failures cluster at interfaces, not in isolated steps');
    }

    // ─── AUTOMATION MATURITY LADDER ──────────────────────────
    function automationLadder(container, config) {
        var W = 900, H = 260;
        var svg = d3.select(container).append('svg')
            .attr('viewBox', '0 0 ' + W + ' ' + H)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('max-width', '100%');

        var levels = [
            { label: 'Level III: Guidance', sub: 'Dynamic worklists, exception triage, "falling behind" detection', color: '#8e44ad' },
            { label: 'Level II: Prevention', sub: 'Constraints + safety checks (prevent known harms)', color: '#f39c12' },
            { label: 'Level I: Tracking', sub: 'Audit events (what happened, when)', color: '#27ae60' }
        ];

        var stepH = 58, baseW = 800, narrowing = 120;

        levels.forEach(function (level, i) {
            var w = baseW - i * narrowing;
            var x = (W - w) / 2;
            var y = H - (levels.length - i) * (stepH + 8);

            var g = svg.append('g').style('opacity', 0);

            g.append('rect').attr('x', x).attr('y', y)
                .attr('width', w).attr('height', stepH)
                .attr('rx', 10).attr('fill', level.color).attr('fill-opacity', 0.12)
                .attr('stroke', level.color).attr('stroke-width', 2);

            g.append('text').attr('x', x + 18).attr('y', y + 25)
                .attr('font-size', '14px').attr('font-weight', '700')
                .attr('fill', level.color).text(level.label);

            g.append('text').attr('x', x + 18).attr('y', y + 45)
                .attr('font-size', '11px').attr('fill', '#555').text(level.sub);

            g.transition().delay((levels.length - 1 - i) * 350).duration(500).style('opacity', 1);
        });
    }

    // ─── REGISTRY (map name → function) ──────────────────────
    var registry = {
        'workflow-pipeline': workflowPipeline,
        'abstraction-layers': abstractionLayers,
        'systems-ecosystem': systemsEcosystem,
        'ai-maturity-ladder': aiMaturityLadder,
        'data-flow': dataFlow,
        'automation-ladder': automationLadder
    };

    function render(name, container, config) {
        var fn = registry[name];
        if (fn) fn(container, config || {});
        else console.warn('VizLibrary: unknown visualization "' + name + '"');
    }

    return { render: render, registry: registry };
})();
