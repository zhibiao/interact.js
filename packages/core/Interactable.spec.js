import d from '@interactjs/_dev/test/domator';
import test from '@interactjs/_dev/test/test';
import * as helpers from './tests/_helpers';
test('Interactable copies and extends defaults', (t) => {
    const scope = helpers.mockScope();
    const { defaults } = scope;
    scope.actions.methodDict = { test: 'testize' };
    scope.Interactable.prototype.testize = function (options) {
        this.setPerAction('test', options);
    };
    defaults.actions.test = {
        fromDefault: { a: 1, b: 2 },
        specified: { c: 1, d: 2 },
    };
    const specified = { specified: 'parent' };
    const div = d('div');
    const interactable = scope.interactables.new(div, { test: specified });
    t.deepEqual(interactable.options.test.specified, specified.specified, 'specified options are properly set');
    t.deepEqual(interactable.options.test.fromDefault, defaults.actions.test.fromDefault, 'default options are properly set');
    t.notEqual(interactable.options.test.fromDefault, defaults.actions.test.fromDefault, 'defaults are not aliased');
    defaults.actions.test.fromDefault.c = 3;
    t.notOk('c' in interactable.options.test.fromDefault, 'modifying defaults does not affect constructed interactables');
    t.end();
});
test('Interactable unset correctly', (t) => {
    const scope = helpers.mockScope();
    const div = d('div');
    const interactable = scope.interactables.new(div);
    const mappingInfo = div[scope.id][0];
    scope.interactables.signals.fire('unset', { interactable });
    t.strictEqual(mappingInfo.context, null, 'unset mappingInfo context');
    t.strictEqual(mappingInfo.interactable, null, 'unset mappingInfo interactable');
    t.strictEqual(div[scope.id].length, 0, 'unset target are removed');
    t.end();
});
test('Interactable copies and extends per action defaults', (t) => {
    const scope = helpers.mockScope();
    const { defaults } = scope;
    scope.actions.methodDict = { test: 'testize' };
    scope.Interactable.prototype.testize = function (options) {
        this.setPerAction('test', options);
    };
    defaults.perAction.testModifier = {
        fromDefault: { a: 1, b: 2 },
        specified: null,
    };
    defaults.actions.test = { testModifier: defaults.perAction.testModifier };
    const div = d('div');
    const interactable = scope.interactables.new(div, {});
    interactable.testize({ testModifier: { specified: 'parent' } });
    t.deepEqual(interactable.options.test, {
        enabled: false,
        origin: { x: 0, y: 0 },
        testModifier: {
            fromDefault: { a: 1, b: 2 },
            specified: 'parent',
        },
    }, 'specified options are properly set');
    t.deepEqual(interactable.options.test.testModifier.fromDefault, defaults.perAction.testModifier.fromDefault, 'default options are properly set');
    t.notEqual(interactable.options.test.testModifier.fromDefault, defaults.perAction.testModifier.fromDefault, 'defaults are not aliased');
    defaults.perAction.testModifier.fromDefault.c = 3;
    t.notOk('c' in interactable.options.test.testModifier.fromDefault, 'modifying defaults does not affect constructed interactables');
    t.end();
});
test('Interactable.updatePerActionListeners', (t) => {
    const scope = helpers.mockScope();
    let fired = [];
    function addToFired(event) { fired.push(event); }
    scope.actions.eventTypes.push('teststart', 'testmove', 'testend');
    scope.actions.methodDict = { test: 'testize' };
    scope.Interactable.prototype.testize = function (options) {
        this.setPerAction('test', options);
    };
    scope.defaults.actions.test = {};
    const interactable = scope.interactables.new('target');
    interactable.setPerAction('test', {
        listeners: [{
                start: addToFired,
                move: addToFired,
                end: addToFired,
            }],
    });
    interactable.fire({ type: 'teststart' });
    t.deepEqual(fired.map((e) => e.type), ['teststart']);
    interactable.fire({ type: 'testmove' });
    t.deepEqual(fired.map((e) => e.type), ['teststart', 'testmove']);
    interactable.fire({ type: 'testnotadded' });
    t.deepEqual(fired.map((e) => e.type), ['teststart', 'testmove']);
    interactable.fire({ type: 'testend' });
    t.deepEqual(fired.map((e) => e.type), ['teststart', 'testmove', 'testend']);
    fired = [];
    interactable.setPerAction('test', {
        listeners: [{ start: addToFired }],
    });
    interactable.fire({ type: 'teststart' });
    interactable.fire({ type: 'testmove' });
    interactable.fire({ type: 'testend' });
    t.deepEqual(fired.map((e) => e.type), ['teststart']);
    fired = [];
    interactable.setPerAction('test', {
        listeners: null,
    });
    interactable.fire({ type: 'teststart' });
    interactable.fire({ type: 'testmove' });
    interactable.fire({ type: 'testend' });
    t.deepEqual(fired, []);
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RhYmxlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbnRlcmFjdGFibGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3QyxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQTtBQUM3QyxPQUFPLEtBQUssT0FBTyxNQUFNLGtCQUFrQixDQUFBO0FBRTNDLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQVMsQ0FBQTtJQUN4QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFBO0lBRTlDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLE9BQU87UUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDcEMsQ0FBQyxDQUFBO0lBRUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUc7UUFDdEIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzNCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtLQUMxQixDQUFBO0lBRUQsTUFBTSxTQUFTLEdBQUcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUE7SUFFekMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxD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QUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUVwRCxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUVoRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUVoRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFFM0UsS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNWLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ2hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDO0tBQ25DLENBQUMsQ0FBQTtJQUVGLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDdkMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUVwRCxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBQ1YsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDaEMsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0lBRUYsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFFdEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvZG9tYXRvcidcbmltcG9ydCB0ZXN0IGZyb20gJ0BpbnRlcmFjdGpzL19kZXYvdGVzdC90ZXN0J1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICcuL3Rlc3RzL19oZWxwZXJzJ1xuXG50ZXN0KCdJbnRlcmFjdGFibGUgY29waWVzIGFuZCBleHRlbmRzIGRlZmF1bHRzJywgKHQpID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBoZWxwZXJzLm1vY2tTY29wZSgpIGFzIGFueVxuICBjb25zdCB7IGRlZmF1bHRzIH0gPSBzY29wZVxuXG4gIHNjb3BlLmFjdGlvbnMubWV0aG9kRGljdCA9IHsgdGVzdDogJ3Rlc3RpemUnIH1cblxuICBzY29wZS5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCd0ZXN0Jywgb3B0aW9ucylcbiAgfVxuXG4gIGRlZmF1bHRzLmFjdGlvbnMudGVzdCA9IHtcbiAgICBmcm9tRGVmYXVsdDogeyBhOiAxLCBiOiAyIH0sXG4gICAgc3BlY2lmaWVkOiB7IGM6IDEsIGQ6IDIgfSxcbiAgfVxuXG4gIGNvbnN0IHNwZWNpZmllZCA9IHsgc3BlY2lmaWVkOiAncGFyZW50JyB9XG5cbiAgY29uc3QgZGl2ID0gZCgnZGl2JylcbiAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5uZXcoZGl2LCB7IHRlc3Q6IHNwZWNpZmllZCB9KVxuXG4gIHQuZGVlcEVxdWFsKGludGVyYWN0YWJsZS5vcHRpb25zLnRlc3Quc3BlY2lmaWVkLCBzcGVjaWZpZWQuc3BlY2lmaWVkLFxuICAgICdzcGVjaWZpZWQgb3B0aW9ucyBhcmUgcHJvcGVybHkgc2V0JylcbiAgdC5kZWVwRXF1YWwoaW50ZXJhY3RhYmxlLm9wdGlvbnMudGVzdC5mcm9tRGVmYXVsdCwgZGVmYXVsdHMuYWN0aW9ucy50ZXN0LmZyb21EZWZhdWx0LFxuICAgICdkZWZhdWx0IG9wdGlvbnMgYXJlIHByb3Blcmx5IHNldCcpXG4gIHQubm90RXF1YWwoaW50ZXJhY3RhYmxlLm9wdGlvbnMudGVzdC5mcm9tRGVmYXVsdCwgZGVmYXVsdHMuYWN0aW9ucy50ZXN0LmZyb21EZWZhdWx0LFxuICAgICdkZWZhdWx0cyBhcmUgbm90IGFsaWFzZWQnKVxuXG4gIGRlZmF1bHRzLmFjdGlvbnMudGVzdC5mcm9tRGVmYXVsdC5jID0gM1xuICB0Lm5vdE9rKCdjJyBpbiBpbnRlcmFjdGFibGUub3B0aW9ucy50ZXN0LmZyb21EZWZhdWx0LFxuICAgICdtb2RpZnlpbmcgZGVmYXVsdHMgZG9lcyBub3QgYWZmZWN0IGNvbnN0cnVjdGVkIGludGVyYWN0YWJsZXMnKVxuXG4gIHQuZW5kKClcbn0pXG5cbnRlc3QoJ0ludGVyYWN0YWJsZSB1bnNldCBjb3JyZWN0bHknLCAodCkgPT4ge1xuICBjb25zdCBzY29wZSA9IGhlbHBlcnMubW9ja1Njb3BlKCkgYXMgYW55XG5cbiAgY29uc3QgZGl2ID0gZCgnZGl2JylcbiAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5uZXcoZGl2KVxuXG4gIGNvbnN0IG1hcHBpbmdJbmZvID0gZGl2W3Njb3BlLmlkXVswXVxuXG4gIHNjb3BlLmludGVyYWN0YWJsZXMuc2lnbmFscy5maXJlKCd1bnNldCcsIHsgaW50ZXJhY3RhYmxlIH0pXG5cbiAgdC5zdHJpY3RFcXVhbChtYXBwaW5nSW5mby5jb250ZXh0LCBudWxsLFxuICAgICd1bnNldCBtYXBwaW5nSW5mbyBjb250ZXh0JylcblxuICB0LnN0cmljdEVxdWFsKG1hcHBpbmdJbmZvLmludGVyYWN0YWJsZSwgbnVsbCxcbiAgICAndW5zZXQgbWFwcGluZ0luZm8gaW50ZXJhY3RhYmxlJylcblxuICB0LnN0cmljdEVxdWFsKGRpdltzY29wZS5pZF0ubGVuZ3RoLCAwLFxuICAgICd1bnNldCB0YXJnZXQgYXJlIHJlbW92ZWQnKVxuXG4gIHQuZW5kKClcbn0pXG5cbnRlc3QoJ0ludGVyYWN0YWJsZSBjb3BpZXMgYW5kIGV4dGVuZHMgcGVyIGFjdGlvbiBkZWZhdWx0cycsICh0KSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gaGVscGVycy5tb2NrU2NvcGUoKVxuICBjb25zdCB7IGRlZmF1bHRzIH0gPSBzY29wZVxuXG4gIHNjb3BlLmFjdGlvbnMubWV0aG9kRGljdCA9IHsgdGVzdDogJ3Rlc3RpemUnIH1cblxuICBzY29wZS5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCd0ZXN0Jywgb3B0aW9ucylcbiAgfVxuXG4gIGRlZmF1bHRzLnBlckFjdGlvbi50ZXN0TW9kaWZpZXIgPSB7XG4gICAgZnJvbURlZmF1bHQ6IHsgYTogMSwgYjogMiB9LFxuICAgIHNwZWNpZmllZDogbnVsbCxcbiAgfVxuICBkZWZhdWx0cy5hY3Rpb25zLnRlc3QgPSB7IHRlc3RNb2RpZmllcjogZGVmYXVsdHMucGVyQWN0aW9uLnRlc3RNb2RpZmllciB9XG5cbiAgY29uc3QgZGl2ID0gZCgnZGl2JylcbiAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5uZXcoZGl2LCB7fSlcbiAgaW50ZXJhY3RhYmxlLnRlc3RpemUoeyB0ZXN0TW9kaWZpZXI6IHsgc3BlY2lmaWVkOiAncGFyZW50JyB9IH0pXG5cbiAgdC5kZWVwRXF1YWwoaW50ZXJhY3RhYmxlLm9wdGlvbnMudGVzdCwge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICB0ZXN0TW9kaWZpZXI6IHtcbiAgICAgIGZyb21EZWZhdWx0OiB7IGE6IDEsIGI6IDIgfSxcbiAgICAgIHNwZWNpZmllZDogJ3BhcmVudCcsXG4gICAgfSxcbiAgfSwgJ3NwZWNpZmllZCBvcHRpb25zIGFyZSBwcm9wZXJseSBzZXQnKVxuICB0LmRlZXBFcXVhbChcbiAgICBpbnRlcmFjdGFibGUub3B0aW9ucy50ZXN0LnRlc3RNb2RpZmllci5mcm9tRGVmYXVsdCxcbiAgICBkZWZhdWx0cy5wZXJBY3Rpb24udGVzdE1vZGlmaWVyLmZyb21EZWZhdWx0LFxuICAgICdkZWZhdWx0IG9wdGlvbnMgYXJlIHByb3Blcmx5IHNldCcpXG4gIHQubm90RXF1YWwoXG4gICAgaW50ZXJhY3RhYmxlLm9wdGlvbnMudGVzdC50ZXN0TW9kaWZpZXIuZnJvbURlZmF1bHQsXG4gICAgZGVmYXVsdHMucGVyQWN0aW9uLnRlc3RNb2RpZmllci5mcm9tRGVmYXVsdCxcbiAgICAnZGVmYXVsdHMgYXJlIG5vdCBhbGlhc2VkJylcblxuICBkZWZhdWx0cy5wZXJBY3Rpb24udGVzdE1vZGlmaWVyLmZyb21EZWZhdWx0LmMgPSAzXG4gIHQubm90T2soJ2MnIGluIGludGVyYWN0YWJsZS5vcHRpb25zLnRlc3QudGVzdE1vZGlmaWVyLmZyb21EZWZhdWx0LFxuICAgICdtb2RpZnlpbmcgZGVmYXVsdHMgZG9lcyBub3QgYWZmZWN0IGNvbnN0cnVjdGVkIGludGVyYWN0YWJsZXMnKVxuXG4gIHQuZW5kKClcbn0pXG5cbnRlc3QoJ0ludGVyYWN0YWJsZS51cGRhdGVQZXJBY3Rpb25MaXN0ZW5lcnMnLCAodCkgPT4ge1xuICBjb25zdCBzY29wZSA9IGhlbHBlcnMubW9ja1Njb3BlKClcblxuICBsZXQgZmlyZWQgPSBbXVxuICBmdW5jdGlvbiBhZGRUb0ZpcmVkIChldmVudCkgeyBmaXJlZC5wdXNoKGV2ZW50KSB9XG5cbiAgc2NvcGUuYWN0aW9ucy5ldmVudFR5cGVzLnB1c2goJ3Rlc3RzdGFydCcsICd0ZXN0bW92ZScsICd0ZXN0ZW5kJylcbiAgc2NvcGUuYWN0aW9ucy5tZXRob2REaWN0ID0geyB0ZXN0OiAndGVzdGl6ZScgfVxuICBzY29wZS5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCd0ZXN0Jywgb3B0aW9ucylcbiAgfVxuXG4gIHNjb3BlLmRlZmF1bHRzLmFjdGlvbnMudGVzdCA9IHt9XG5cbiAgY29uc3QgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5uZXcoJ3RhcmdldCcpXG5cbiAgaW50ZXJhY3RhYmxlLnNldFBlckFjdGlvbigndGVzdCcsIHtcbiAgICBsaXN0ZW5lcnM6IFt7XG4gICAgICBzdGFydDogYWRkVG9GaXJlZCxcbiAgICAgIG1vdmU6IGFkZFRvRmlyZWQsXG4gICAgICBlbmQ6IGFkZFRvRmlyZWQsXG4gICAgfV0sXG4gIH0pXG5cbiAgaW50ZXJhY3RhYmxlLmZpcmUoeyB0eXBlOiAndGVzdHN0YXJ0JyB9KVxuICB0LmRlZXBFcXVhbChmaXJlZC5tYXAoKGUpID0+IGUudHlwZSksIFsndGVzdHN0YXJ0J10pXG5cbiAgaW50ZXJhY3RhYmxlLmZpcmUoeyB0eXBlOiAndGVzdG1vdmUnIH0pXG4gIHQuZGVlcEVxdWFsKGZpcmVkLm1hcCgoZSkgPT4gZS50eXBlKSwgWyd0ZXN0c3RhcnQnLCAndGVzdG1vdmUnXSlcblxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0bm90YWRkZWQnIH0pXG4gIHQuZGVlcEVxdWFsKGZpcmVkLm1hcCgoZSkgPT4gZS50eXBlKSwgWyd0ZXN0c3RhcnQnLCAndGVzdG1vdmUnXSlcblxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0ZW5kJyB9KVxuICB0LmRlZXBFcXVhbChmaXJlZC5tYXAoKGUpID0+IGUudHlwZSksIFsndGVzdHN0YXJ0JywgJ3Rlc3Rtb3ZlJywgJ3Rlc3RlbmQnXSlcblxuICBmaXJlZCA9IFtdXG4gIGludGVyYWN0YWJsZS5zZXRQZXJBY3Rpb24oJ3Rlc3QnLCB7XG4gICAgbGlzdGVuZXJzOiBbeyBzdGFydDogYWRkVG9GaXJlZCB9XSxcbiAgfSlcblxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0c3RhcnQnIH0pXG4gIGludGVyYWN0YWJsZS5maXJlKHsgdHlwZTogJ3Rlc3Rtb3ZlJyB9KVxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0ZW5kJyB9KVxuICB0LmRlZXBFcXVhbChmaXJlZC5tYXAoKGUpID0+IGUudHlwZSksIFsndGVzdHN0YXJ0J10pXG5cbiAgZmlyZWQgPSBbXVxuICBpbnRlcmFjdGFibGUuc2V0UGVyQWN0aW9uKCd0ZXN0Jywge1xuICAgIGxpc3RlbmVyczogbnVsbCxcbiAgfSlcblxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0c3RhcnQnIH0pXG4gIGludGVyYWN0YWJsZS5maXJlKHsgdHlwZTogJ3Rlc3Rtb3ZlJyB9KVxuICBpbnRlcmFjdGFibGUuZmlyZSh7IHR5cGU6ICd0ZXN0ZW5kJyB9KVxuICB0LmRlZXBFcXVhbChmaXJlZCwgW10pXG5cbiAgdC5lbmQoKVxufSlcbiJdfQ==