const history = [];

const getHistory = () => {
    return history;
};

const updateHistory = (...result) => {
    const the_history = result.reduce((rollInfo, { name, rating }) => {
        rollInfo.push({
            name: name,
            rating: rating,
            date: new Date(),
        });
        return rollInfo;
    }, []);
    history.push(...the_history);
};

export default { getHistory, updateHistory };
