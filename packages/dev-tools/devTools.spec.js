import test from '@interactjs/_dev/test/test';
import { drag, resize } from '@interactjs/actions';
import * as helpers from '@interactjs/core/tests/_helpers';
import * as utils from '@interactjs/utils';
import devTools from './';
const { checks, links, prefix } = devTools;
const checkMap = checks.reduce((acc, check) => {
    acc[check.name] = check;
    return acc;
}, {});
test('devTools', (t) => {
    const scope = helpers.mockScope();
    const logs = [];
    function log(args, type) {
        logs.push({ args, type });
    }
    scope.usePlugin(devTools, {
        logger: {
            warn(...args) { log(args, 'warn'); },
            log(...args) { log(args, 'log'); },
            error(...args) { log(args, 'error'); },
        },
    });
    scope.usePlugin(drag);
    scope.usePlugin(resize);
    const element = scope.document.body.appendChild(scope.document.createElement('div'));
    const event = utils.pointer.coordsToEvent(utils.pointer.newCoords());
    const interactable = scope.interactables.new(element)
        .draggable(true)
        .resizable({ onmove: () => { } });
    const interaction = scope.interactions.new({});
    interaction.pointerDown(event, event, element);
    interaction.start({ name: 'drag' }, interactable, element);
    t.deepEqual(logs[0], { args: [prefix + checkMap.touchAction.text, element, links.touchAction], type: 'warn' }, 'warning about missing touchAction');
    t.deepEqual(logs[1], { args: [prefix + checkMap.noListeners.text, 'drag', interactable], type: 'warn' }, 'warning about missing move listeners');
    interaction.stop();
    // resolve touchAction
    element.style.touchAction = 'none';
    // resolve missing listeners
    interactable.on('dragmove', () => { });
    interaction.start({ name: 'resize' }, interactable, element);
    interaction.pointerMove(event, event, element);
    interaction.end();
    t.deepEqual(logs[2], { args: [prefix + checkMap.boxSizing.text, element, links.boxSizing], type: 'warn' }, 'warning about resizing without "box-sizing: none"');
    // resolve boxSizing
    element.style.boxSizing = 'border-box';
    interaction.start({ name: 'resize' }, interactable, element);
    interaction.move({ event, pointer: event });
    interaction.end();
    interaction.start({ name: 'drag' }, interactable, element);
    interaction.pointerMove(event, event, element);
    interaction.end();
    t.equal(logs.length, 3, 'no warnings when issues are resolved');
    // re-introduce boxSizing issue
    element.style.boxSizing = '';
    interaction.start({ name: 'drag' }, interactable, element);
    interaction.end();
    interactable.options.devTools.ignore = { boxSizing: true };
    interaction.start({ name: 'drag' }, interactable, element);
    interaction.end();
    t.equal(logs.length, 3, 'no warning with options.devTools.ignore');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2VG9vbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldlRvb2xzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sNEJBQTRCLENBQUE7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUNsRCxPQUFPLEtBQUssT0FBTyxNQUFNLGlDQUFpQyxDQUFBO0FBQzFELE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUE7QUFDMUMsT0FBTyxRQUEyQixNQUFNLElBQUksQ0FBQTtBQUU1QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUE7QUFDMUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM1QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtJQUN2QixPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsRUFBRSxFQUE4QixDQUFDLENBQUE7QUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sS0FBSyxHQUFtQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDakQsTUFBTSxJQUFJLEdBQStDLEVBQUUsQ0FBQTtJQUUzRCxTQUFTLEdBQUcsQ0FBRSxJQUFJLEVBQUUsSUFBSTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1FBQ3hCLE1BQU0sRUFBRTtZQUNOLElBQUksQ0FBRSxHQUFHLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNw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WyJpbXBvcnQgdGVzdCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvdGVzdCdcbmltcG9ydCB7IGRyYWcsIHJlc2l6ZSB9IGZyb20gJ0BpbnRlcmFjdGpzL2FjdGlvbnMnXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJ0BpbnRlcmFjdGpzL2NvcmUvdGVzdHMvX2hlbHBlcnMnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscydcbmltcG9ydCBkZXZUb29scywgeyBDaGVjaywgTG9nZ2VyIH0gZnJvbSAnLi8nXG5cbmNvbnN0IHsgY2hlY2tzLCBsaW5rcywgcHJlZml4IH0gPSBkZXZUb29sc1xuY29uc3QgY2hlY2tNYXAgPSBjaGVja3MucmVkdWNlKChhY2MsIGNoZWNrKSA9PiB7XG4gIGFjY1tjaGVjay5uYW1lXSA9IGNoZWNrXG4gIHJldHVybiBhY2Ncbn0sIHt9IGFzIHsgW25hbWU6IHN0cmluZ106IENoZWNrfSlcblxudGVzdCgnZGV2VG9vbHMnLCAodCkgPT4ge1xuICBjb25zdCBzY29wZTogSW50ZXJhY3QuU2NvcGUgPSBoZWxwZXJzLm1vY2tTY29wZSgpXG4gIGNvbnN0IGxvZ3M6IEFycmF5PHsgYXJnczogYW55W10sIHR5cGU6IGtleW9mIExvZ2dlciB9PiA9IFtdXG5cbiAgZnVuY3Rpb24gbG9nIChhcmdzLCB0eXBlKSB7XG4gICAgbG9ncy5wdXNoKHsgYXJncywgdHlwZSB9KVxuICB9XG5cbiAgc2NvcGUudXNlUGx1Z2luKGRldlRvb2xzLCB7XG4gICAgbG9nZ2VyOiB7XG4gICAgICB3YXJuICguLi5hcmdzKSB7IGxvZyhhcmdzLCAnd2FybicpIH0sXG4gICAgICBsb2cgKC4uLmFyZ3MpIHsgbG9nKGFyZ3MsICdsb2cnKSB9LFxuICAgICAgZXJyb3IgKC4uLmFyZ3MpIHsgbG9nKGFyZ3MsICdlcnJvcicpIH0sXG4gICAgfSxcbiAgfSlcblxuICBzY29wZS51c2VQbHVnaW4oZHJhZylcbiAgc2NvcGUudXNlUGx1Z2luKHJlc2l6ZSlcblxuICBjb25zdCBlbGVtZW50ID0gc2NvcGUuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY29wZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgY29uc3QgZXZlbnQgPSB1dGlscy5wb2ludGVyLmNvb3Jkc1RvRXZlbnQodXRpbHMucG9pbnRlci5uZXdDb29yZHMoKSlcbiAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5uZXcoZWxlbWVudClcbiAgICAuZHJhZ2dhYmxlKHRydWUpXG4gICAgLnJlc2l6YWJsZSh7IG9ubW92ZTogKCkgPT4ge30gfSlcbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBzY29wZS5pbnRlcmFjdGlvbnMubmV3KHt9KVxuXG4gIGludGVyYWN0aW9uLnBvaW50ZXJEb3duKGV2ZW50LCBldmVudCwgZWxlbWVudClcbiAgaW50ZXJhY3Rpb24uc3RhcnQoeyBuYW1lOiAnZHJhZycgfSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KVxuICB0LmRlZXBFcXVhbChcbiAgICBsb2dzWzBdLFxuICAgIHsgYXJnczogW3ByZWZpeCArIGNoZWNrTWFwLnRvdWNoQWN0aW9uLnRleHQsIGVsZW1lbnQsIGxpbmtzLnRvdWNoQWN0aW9uXSwgdHlwZTogJ3dhcm4nIH0sXG4gICAgJ3dhcm5pbmcgYWJvdXQgbWlzc2luZyB0b3VjaEFjdGlvbicpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgbG9nc1sxXSxcbiAgICB7IGFyZ3M6IFtwcmVmaXggKyBjaGVja01hcC5ub0xpc3RlbmVycy50ZXh0LCAnZHJhZycsIGludGVyYWN0YWJsZV0sIHR5cGU6ICd3YXJuJyB9LFxuICAgICd3YXJuaW5nIGFib3V0IG1pc3NpbmcgbW92ZSBsaXN0ZW5lcnMnKVxuXG4gIGludGVyYWN0aW9uLnN0b3AoKVxuXG4gIC8vIHJlc29sdmUgdG91Y2hBY3Rpb25cbiAgZWxlbWVudC5zdHlsZS50b3VjaEFjdGlvbiA9ICdub25lJ1xuICAvLyByZXNvbHZlIG1pc3NpbmcgbGlzdGVuZXJzXG4gIGludGVyYWN0YWJsZS5vbignZHJhZ21vdmUnLCAoKSA9PiB7fSlcblxuICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdyZXNpemUnIH0sIGludGVyYWN0YWJsZSwgZWxlbWVudClcbiAgaW50ZXJhY3Rpb24ucG9pbnRlck1vdmUoZXZlbnQsIGV2ZW50LCBlbGVtZW50KVxuICBpbnRlcmFjdGlvbi5lbmQoKVxuXG4gIHQuZGVlcEVxdWFsKFxuICAgIGxvZ3NbMl0sXG4gICAgeyBhcmdzOiBbcHJlZml4ICsgY2hlY2tNYXAuYm94U2l6aW5nLnRleHQsIGVsZW1lbnQsIGxpbmtzLmJveFNpemluZ10sIHR5cGU6ICd3YXJuJyB9LFxuICAgICd3YXJuaW5nIGFib3V0IHJlc2l6aW5nIHdpdGhvdXQgXCJib3gtc2l6aW5nOiBub25lXCInKVxuXG4gIC8vIHJlc29sdmUgYm94U2l6aW5nXG4gIGVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnXG5cbiAgaW50ZXJhY3Rpb24uc3RhcnQoeyBuYW1lOiAncmVzaXplJyB9LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG4gIGludGVyYWN0aW9uLm1vdmUoeyBldmVudCwgcG9pbnRlcjogZXZlbnQgfSlcbiAgaW50ZXJhY3Rpb24uZW5kKClcblxuICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG4gIGludGVyYWN0aW9uLnBvaW50ZXJNb3ZlKGV2ZW50LCBldmVudCwgZWxlbWVudClcbiAgaW50ZXJhY3Rpb24uZW5kKClcblxuICB0LmVxdWFsKFxuICAgIGxvZ3MubGVuZ3RoLFxuICAgIDMsXG4gICAgJ25vIHdhcm5pbmdzIHdoZW4gaXNzdWVzIGFyZSByZXNvbHZlZCcpXG5cbiAgLy8gcmUtaW50cm9kdWNlIGJveFNpemluZyBpc3N1ZVxuICBlbGVtZW50LnN0eWxlLmJveFNpemluZyA9ICcnXG5cbiAgaW50ZXJhY3Rpb24uc3RhcnQoeyBuYW1lOiAnZHJhZycgfSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KVxuICBpbnRlcmFjdGlvbi5lbmQoKVxuXG4gIGludGVyYWN0YWJsZS5vcHRpb25zLmRldlRvb2xzLmlnbm9yZSA9IHsgYm94U2l6aW5nOiB0cnVlIH1cblxuICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG4gIGludGVyYWN0aW9uLmVuZCgpXG5cbiAgdC5lcXVhbChcbiAgICBsb2dzLmxlbmd0aCxcbiAgICAzLFxuICAgICdubyB3YXJuaW5nIHdpdGggb3B0aW9ucy5kZXZUb29scy5pZ25vcmUnKVxuXG4gIHQuZW5kKClcbn0pXG4iXX0=