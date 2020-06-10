import { groupBy } from "../components/helpers/Data";


test('Primero', () => {
    expect(1).toBe(1);
});


test('GroupBy', () => {

    const groupEntities = [
        { id: 10, name: 'Grupo 1' },
        { id: 11, name: 'Grupo 2' },
    ];

    const list = [
        { id: 100, idGroup: 10, name: 'elemento 100' },
        { id: 101, idGroup: 10, name: 'elemento 101' },
        { id: 102, idGroup: 10, name: 'elemento 102' },
        { id: 103, idGroup: 10, name: 'elemento 103' },
        { id: 104, idGroup: 10, name: 'elemento 104' },
        { id: 105, idGroup: 11, name: 'elemento 105' },
        { id: 106, idGroup: 11, name: 'elemento 106' },
        { id: 107, idGroup: 11, name: 'elemento 107' },
    ]

    const result = groupBy(list, groupEntities, 'id', 'idGroup');

    expect(result.length).toBe(2);
    expect(result[0].grouped.length).toBe(5);
    expect(result[1].grouped.length).toBe(3);
});