function createTitleFromState(state) {
    let titleParts = [];

    if (state.get('blocks').size > 1) {
        titleParts.push(state.get('blocks').size + ' blocks world');
    }
    titleParts.push(WEB_NAME);

    return titleParts.join(TITLE_SEPARATOR);
}