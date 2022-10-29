module.exports.getPreviousComment = (comments, messageTitle) =>
    comments.find(
        (comment) =>
            comment.body.includes(messageTitle) && comment.user.login === 'github-actions[bot]',
    );

module.exports.addComment = async ({ context, github }, message) => {
    await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ['issue_number']: context.issue.number,
        body: message,
    });

    console.log('Left a new comment on the PR');
};

module.exports.updateComment = async ({ context, github }, commentId, message) => {
    await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ['comment_id']: commentId,
        body: message,
    });

    console.log(`Update comment #${commentId} on the PR`);
};
