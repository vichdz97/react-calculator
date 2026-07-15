import { useEffect, useState } from "react";

function AppV2() {
    const [showPanel, setShowPanel] = useState(true);
    const [result, setResult] = useState('');

    const valuesArray: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
    const operationsArray: string[] = ['÷', '×', '-', '+', '='];
    const miscArray: string[] = ['AC', '+/-', '%'];
    const miscKeys: string[] = ['c', 'C', '-', 'Backspace'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => changeResult(e.key);
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [result]);

    const deleteLastChar = (): void => setResult(prev => prev.slice(0, -1));

    const changeResult = (input: string): void => {
        if (!valuesArray.includes(input) && !miscArray.includes(input) && !miscKeys.includes(input)) return;

        if (result.includes('.') && input === '.') return; // only one decimal point

        if (result.endsWith('%') && input === '%') {
            deleteLastChar();
            return;
        }

        applyMisc(input);
    }

    const applyMisc = (input: string): void => {
        switch (input) {
            case 'AC':
            case 'C':
            case 'c': 
                setResult(''); 
                break;
            case '+/-': 
            case '-': 
                result.endsWith('%') ? setResult(prev => `${-parseFloat(prev)}%`) : setResult(prev => `${-parseFloat(prev)}`); 
                break;
            case '%': setResult(prev => prev + '%'); break;
            case 'Backspace': deleteLastChar(); break;
            default: setResult(prev => prev + input);;
        }
    }

    return (
        <div className="min-h-screen flex bg-slate-950">
            {/* Hides/Shows side panel displaying calculation history */}
            <button 
                className={`m-2 w-10 h-10 rounded-lg text-slate-100 absolute top-0 left-0 transition-colors hover:bg-slate-100/10 ${showPanel ? 'hidden' : 'block'}`}
                onClick={() => setShowPanel(!showPanel)}
            >
                →
            </button>

            {/* Side Panel */}
            <div className={`bg-slate-900 w-1/3 text-slate-100 relative p-4 ${showPanel ? 'block' : 'hidden'}`}>
                Calculation History
                <div className="absolute top-0 right-0">
                    <button 
                        className="m-2 w-10 h-10 rounded-lg transition-colors hover:bg-slate-100/10"
                        onClick={() => setShowPanel(!showPanel)}
                    >
                        Ⓧ
                    </button>
                </div>
            </div>

            {/* Main Panel containing calculator */}
            <div className="bg-slate-800 text-slate-100 flex-1">
                {/* Calculator Container */}
                <div className="h-full flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-4xl font-bold">React Calculator</h1>
                    <div className="w-100 bg-slate-500 w-3/4 h-3/4 flex flex-col gap-4 rounded-xl p-4">
                        <div className="relative h-20 p-4 text-4xl bg-slate-800 rounded overflow-hidden">
                            <span className="absolute right-0 mx-4">{result || 0}</span>
                        </div>

                        {/* Button Grid Container */}
                        <div className="h-full grid gap-1 grid-rows-5 grid-cols-4">
                            <div className="col-span-3 grid grid-cols-3 gap-1">
                                {
                                    miscArray.map((misc, index) => {
                                        return (
                                            <div 
                                                key={index} 
                                                onClick={() => changeResult(misc)}
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
                                                onClick={() => changeResult(val)}
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
                                            <div key={index} className="bg-blue-400 rounded-full flex items-center justify-center transition-colors hover:bg-blue-300">
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