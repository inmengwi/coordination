
const FunctionTab = ({ index, functionName, activeTab, onTabClick }) => {
    return (
        <div
            onClick={() => onTabClick(index)}
            style={{
                padding: '10px 20px',
                borderBottom: activeTab === index ? '2px solid blue' : 'none',
            }}
        >
            { functionName }
        </div>
    );
}

export default FunctionTab;