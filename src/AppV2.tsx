import { useEffect, useState } from "react";
import { Circle, CircleCheck, CircleX, Clock9, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Entry {
    eq: string;
    ans: string;
    selected: boolean;
}

function AppV2() {
    const navigate = useNavigate();

    const [showPanel, setShowPanel] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [history, setHistory] = useState<Entry[]>([]);
    const [count, setCount] = useState<number>(0);
    const [version, setVersion] = useState<string>('v2');
    const [showVersion, setShowVersion] = useState<boolean>(false);

    const valuesArray: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
    const operationsArray: string[] = ['÷', '×', '-', '+', '='];
    const miscArray: string[] = ['AC', '+/-', '%'];
    const miscKeys: string[] = ['c', 'C', 'h', 'H', 'v', 'V', 'Backspace', '/', '*', 'Enter'];
    const operators: string[] = ['/', '*', '-', '+'];
    const LAST_ENTRY: string = result.slice(-1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => updateResult(e.key);
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [result]);

    useEffect(() => {
        const selectedEntries = history.filter(entry => entry.selected);
        setCount(selectedEntries.length);
    }, [history]);

    useEffect(() => {
        if (version === 'v1') {
            navigate('/v1');
            import('bootstrap/dist/css/bootstrap.css');
        }
        else {
            navigate('/v2');
            import('./index.css');
        }
    }, [version]);

    const deleteLastChar = (): void => setResult(prev => prev.slice(0, -1));

    const convertOperator = (input: string): string => {
        if (input === '÷') return '/';
        if (input === '×') return '*';
        return input;
    };

    const convertPercentages = (): string => {
        const numbers = result.split(/[+\-\*\/]/g);
        const ops = result.split(/[^+\-\*\/]/g).filter(x => x != '');

        const convertedPercents = numbers.map(el => {
            let num = '';
            if (el.endsWith('%)')) {
                num = el.slice(0, -2);
                let decimal = parseFloat(num) / 100;
                return decimal + ')';
            }
            else if (el.endsWith('%')) {
                num = el.slice(0, -1);
                let decimal = parseFloat(num) / 100;
                return decimal;
            }
            return el;
        });

        let concatArray = [];
        for (let i = 0; i < convertedPercents.length; i++) {
            concatArray.push(convertedPercents[i]);
            concatArray.push(ops[i]);
        }
        
        const filteredConcatArray = concatArray.filter(x => x != undefined);
        return filteredConcatArray.join('');
    };

    const negateLastElement = () => {
        const nums = result.split(/[+\-\*\/]/g);
        const lastEl = nums.pop() ?? '';
        if (lastEl.includes(')')) {
            const removedP = lastEl.slice(0, -1); // remove ')'
            const negativeNum = '-' + removedP;
            const positiveNum = result.endsWith('%)') ? `${-parseFloat(negativeNum)}%` : -parseFloat(negativeNum);
            setResult(prev => prev.slice(0, -lastEl.length - 2) + positiveNum);
            return;
        }
        const negatedEl = result.endsWith('%') ? `${-parseFloat(lastEl)}%` : -parseFloat(lastEl);
        setResult(prev => prev.slice(0, -lastEl.length) + `(${negatedEl})`)
    };

    const updateResult = (input: string): void => {
        if (!valuesArray.includes(input) && !operationsArray.includes(input) && !miscArray.includes(input) && !miscKeys.includes(input)) return;

        const currentNum = result.split(/[+\-\*\/]/g).pop() ?? '';
        if (input === '.' && currentNum.includes('.')) return; // only one decimal point per current number

        if (input === '%' && result.endsWith('%')) {
            deleteLastChar(); // remove percentage if already present
            return;
        }

        if (input === '+/-') {
            if (result === '' || result.endsWith('+') || result.endsWith('-') || result.endsWith('*') || result.endsWith('/')) return;
            negateLastElement();
        }

        const newInput = convertOperator(input);
        if (result.endsWith(newInput) && operators.includes(newInput)) return; // no dupe operators
        if (operators.includes(LAST_ENTRY) && operators.includes(newInput) && LAST_ENTRY !== newInput) // replace operators
            deleteLastChar();

        applyInput(newInput);
    };

    const applyInput = (input: string): void => {
        switch (input) {
            case 'AC':
            case 'C':
            case 'c': setResult(''); break;
            case 'H':
            case 'h': 
                setShowVersion(false);
                setShowPanel(prev => !prev); 
                setEditing(false);
                break;
            case 'V': 
            case 'v': 
                setShowVersion(prev => !prev);
                setShowPanel(false); 
                setEditing(false);
                break;
            case '+/-': break;
            case '%': setResult(prev => prev + '%'); break;
            case 'Backspace': deleteLastChar(); break;
            case '=':
            case 'Enter':
                const convertedResult = convertPercentages();
                const finalAnswer = eval(convertedResult).toString();
                setResult(finalAnswer);
                setHistory(prev => [{ eq: result, ans: finalAnswer, selected: false }, ...prev]); // add to beginning of array
                break;
            default: setResult(prev => prev + input);
        }
    };

    const selectEntries = (entry: Entry) => {
        setHistory(history.map(e => {
            return entry === e ? {...e, selected: !e.selected} : e;
        }));
    };

    const deleteEntries = () => {
        if (count === 0) {
            setHistory([]);
            setEditing(false);
        } else {
            setHistory(history.filter(entry => !entry.selected));
        }
    };
    
    return (
        <div className="min-h-screen flex bg-slate-950">
            <div className={`flex flex-col gap-1 absolute top-0 left-0 m-2 text-slate-100
                ${showPanel ? "hidden" : "block"}
            `}>
                {/* Hide/Show side panel displaying calculation history */}
                <Clock9 
                    size={32}
                    className="p-2 rounded-lg transition-colors hover:bg-slate-100/10"
                    onClick={() => {
                        setShowPanel(!showPanel);
                        setShowVersion(false);
                    }}
                />
                {/* Select App Version */}
                <div className="flex gap-1">
                    <label htmlFor="versions">
                        <Tag 
                            size={32} 
                            className="p-2 rounded-lg transition-colors hover:bg-slate-100/10"
                            onClick={() => setShowVersion(!showVersion)}
                        />
                    </label>
                    <select 
                        id="versions" 
                        name="versions" 
                        value={version} 
                        className={showVersion ? "block" : "hidden"} 
                        onChange={(e) => setVersion(e.target.value)}
                    >
                        <option value="v1" disabled={version === 'v1'}>v1.0</option>
                        <option value="v2" disabled={version === 'v2'}>v2.0</option>
                    </select>
                </div>
            </div>

            {/* Side Panel */}
            <div className={`
                max-h-screen overflow-y-auto w-1/3 relative p-2 bg-slate-900 text-slate-100
                ${showPanel ? "block" : "hidden"}
            `}>
                <div className="flex justify-between">
                    <button 
                        onClick={() => {
                            setEditing(prev => !prev);
                            setHistory(history.map(h => {
                                return h.selected ? {...h, selected: false} : h;
                            }));
                        }}
                        className="text-sm px-3 py-1 rounded rounded-lg transition-colors hover:bg-slate-100/10"
                    >
                        { editing ? "Done" : "Edit" }
                    </button>
                    { editing ? 
                        <button 
                            onClick={deleteEntries} 
                            className="text-sm px-3 py-1 rounded rounded-lg transition-colors hover:bg-slate-100/10"
                        >
                            { count === 0 ? "Clear All" : `Delete (${count})`}
                        </button>
                        :
                        <CircleX
                            size={32}
                            onClick={() => setShowPanel(!showPanel)}
                            className="m-2 p-2 rounded-lg transition-colors hover:bg-slate-100/10"
                        />
                    }
                </div>
                <ul className="mt-2 flex flex-col">
                    { history.map((entry, index) => {
                        return (
                            <li 
                                key={index}
                                onClick={() => editing ? selectEntries(entry) : setResult(entry.ans)}
                                className={`
                                    flex align-baseline justify-between px-2 py-1 
                                    border-b last:border-b-0 border-slate-800 rounded-lg 
                                    transition-colors hover:bg-slate-100/10 
                                    ${editing && entry.selected && "bg-slate-100/10"}
                                `}
                            >
                                { editing && (entry.selected ? 
                                    <CircleCheck size={20} className="my-auto"/> 
                                    : 
                                    <Circle size={20} className="my-auto" />
                                )}
                                <div className="text-right w-full">
                                    <p className="text-sm text-slate-500">{entry.eq}</p>
                                    <p className="text-xl">{entry.ans}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Main Panel containing calculator */}
            <div className="bg-slate-800 text-slate-100 flex-1">
                {/* Calculator Container */}
                <div className="h-full flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-4xl font-bold">React Calculator</h1>
                    <div className="max-w-100 bg-slate-500 w-3/4 h-3/4 flex flex-col gap-4 rounded-xl p-4">
                        <div className="relative h-20 p-4 text-4xl bg-slate-800 rounded overflow-hidden">
                            <span id="result" className="absolute right-0 mx-4">{result || 0}</span>
                        </div>

                        {/* Button Grid Container */}
                        <div className="h-full grid gap-1 grid-rows-5 grid-cols-4">
                            <div className="col-span-3 grid grid-cols-3 gap-1">
                                {
                                    miscArray.map((misc, index) => {
                                        return (
                                            <div 
                                                key={index} 
                                                onClick={() => updateResult(misc)}
                                                className={`bg-slate-400 rounded-full flex items-center justify-center transition-colors hover:bg-slate-300`}>
                                                <button className="text-2xl">{misc}</button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="row-start-2 row-span-4 col-span-3 grid grid-rows-4 grid-cols-3 gap-1">
                                {
                                    valuesArray.map((val, index) => {
                                        return (
                                            <div 
                                                key={index} 
                                                onClick={() => updateResult(val)}
                                                className={`bg-slate-500 rounded-full flex items-center justify-center transition-all hover:bg-slate-400 hover:scale-[1.1] ${val === '0' && 'col-span-2'}`}>
                                                <button className="value-btn text-2xl">{val}</button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="row-span-full col-start-4 grid grid-rows-5 gap-1">
                                {
                                    operationsArray.map((op, index) => {
                                        return (
                                            <div 
                                                key={index}
                                                onClick={() => updateResult(op)}
                                                className="bg-blue-400 rounded-full flex items-center justify-center transition-colors hover:bg-blue-300">
                                                <button className="text-3xl">{op}</button>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppV2;