export const paginationArray = (data) => {
    const total_page = Math.ceil(data.count / data.limit);
    const total_limit = data.limit;
    const current_page = data.page;

    let prev_page = current_page == 1 ? null : parseInt(current_page) - 1;
    prev_page = current_page > total_page ? null : parseInt(current_page) - 1;

    let next_page =
        current_page >= total_page ? null : parseInt(current_page) + 1;

    const startIndex = (parseInt(current_page) - 1) * parseInt(total_limit);
    const endIndex = parseInt(startIndex) + parseInt(total_limit);

    const currentPageData = data.data.slice(startIndex, endIndex);
    const result = {
        data: currentPageData,
        pagination: {
            total_records: data.count,
            total_limit: total_limit,
            total_page,
            current_page,
            next_page,
            prev_page,
        },
    };
    return result;
};
