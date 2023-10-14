import React, { useMemo, useState } from 'react';

const JSONTree = ({ json, depth = 0 }) => {
    const [collapsedKeys, setCollapsedKeys] = useState(new Set());

    const toggleKey = (key) => {
        const newCollapsedKeys = new Set(collapsedKeys);
        if (collapsedKeys.has(key)) {
            newCollapsedKeys.delete(key);
        } else {
            newCollapsedKeys.add(key);
        }
        setCollapsedKeys(newCollapsedKeys);
    };

    const isArray = Array.isArray(json);

    const getColorByType = (value) => {
        switch (typeof value) {
            case 'number':
                return '#098658'; // Green
            case 'string':
                return '#a31515'; // Red
            case 'boolean':
                return '#1e1e1e'; // Dark Gray
            default:
                return value === null ? '#1e1e1e' : 'black'; // Dark Gray for null
        }
    };

    const keys = useMemo(() => Object.keys(json), [json]);

    return (
        <div style={{
            paddingLeft: depth === 0 ? 0 : 20,
            fontFamily: 'Consolas, "Courier New", monospace',
            borderLeft: depth > 0 ? '1px solid #ddd' : 'none',
            marginLeft: depth > 0 ? 10 : 0
        }}>
            {isArray ? (
                <>
                    <span style={{ color: '#1e1e1e' }}>[</span>
                    <div style={{ marginLeft: 15 }}>
                        {keys.map((key, index, array) => {
                            const value = json[key];
                            const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
                            const isNestedArray = Array.isArray(value);
                            const isLast = index === array.length - 1;

                            return (
                                <div key={key} style={{ margin: '3px 0' }}>
                                    <strong style={{ color: '#000080' }}>
                                        <span
                                            onClick={() => toggleKey(key)}
                                            style={{
                                                cursor: 'pointer',
                                                color: '#1e1e1e',
                                                marginRight: 5
                                            }}
                                            onMouseOver={(e) => e.target.style.color = '#a31515'}
                                            onMouseOut={(e) => e.target.style.color = '#1e1e1e'}
                                        >
                                            {(isObject || isNestedArray) ? (collapsedKeys.has(key) ? '[+]' : '[-]') : ''}
                                        </span>
                                        {isArray ? `[${key}]: ` : `${key}: `}
                                    </strong>
                                    {isObject || isNestedArray ? (
                                        collapsedKeys.has(key) ?
                                            <span style={{ color: '#1e1e1e' }}>{isNestedArray ? '[...]' : '{...}'}</span> :
                                            <JSONTree json={value} depth={depth + 1} />
                                    ) : (
                                        <span style={{ color: getColorByType(value) }}>
                                            {JSON.stringify(value)}
                                        </span>
                                    )}
                                    {!isLast && ','}
                                </div>
                            );
                        })}
                    </div>
                    <span style={{ color: '#1e1e1e' }}>]</span>
                </>
            ) : (
                <>
                    <span style={{ color: '#1e1e1e' }}>{'{'}</span>
                    <div style={{ marginLeft: 15 }}>
                        {keys.map((key, index, array) => {
                            const value = json[key];
                            const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
                            const isNestedArray = Array.isArray(value);
                            const isLast = index === array.length - 1;

                            return (
                                <div key={key} style={{ margin: '3px 0' }}>
                                    <strong style={{ color: '#000080' }}>
                                        <span
                                            onClick={() => toggleKey(key)}
                                            style={{
                                                cursor: 'pointer',
                                                color: '#1e1e1e',
                                                marginRight: 5
                                            }}
                                            onMouseOver={(e) => e.target.style.color = '#a31515'}
                                            onMouseOut={(e) => e.target.style.color = '#1e1e1e'}
                                        >
                                            {(isObject || isNestedArray) ? (collapsedKeys.has(key) ? '[+]' : '[-]') : ''}
                                        </span>
                                        {`${key}: `}
                                    </strong>
                                    {isObject || isNestedArray ? (
                                        collapsedKeys.has(key) ?
                                            <span style={{ color: '#1e1e1e' }}>{isNestedArray ? '[...]' : '{...}'}</span> :
                                            <JSONTree json={value} depth={depth + 1} />
                                    ) : (
                                        <span style={{ color: getColorByType(value) }}>
                                            {JSON.stringify(value)}
                                        </span>
                                    )}
                                    {!isLast && ','}
                                </div>
                            );
                        })}
                    </div>
                    <span style={{ color: '#1e1e1e' }}>{'}'}</span>
                </>
            )}
        </div>
    );
};

export default JSONTree;
