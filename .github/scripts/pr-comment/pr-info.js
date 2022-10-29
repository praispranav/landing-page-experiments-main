const messageTitle = '📝 PR INFO';

const getTitle = () => messageTitle;
module.exports.getTitle = getTitle;

function getMessage({ context: { repo, payload, runId }, require }) {
    const outdent = require('outdent');

    const branchName = payload.pull_request.head.ref;
    const basePrefix = `${repo.repo}/dev/${branchName}/${runId}`;

    return outdent`
    ## ${getTitle()}

    Run [#${runId}](https://github.com/getndazn/landing-page-experiments/actions/runs/${runId})

    ### Test Results

    #### UI
    - [Reports](https://terebu.daznplatform.io/${basePrefix}/ui/reports/html/index.html)
    - [Snapshots](https://terebu.daznplatform.io/?prefix=${basePrefix}/ui/snapshots/integration-ui)

    #### Integration
    - [Reports](https://terebu.daznplatform.io/${basePrefix}/integration/reports/html/index.html)
    
    #### E2E
    - [Reports](https://terebu.daznplatform.io/${basePrefix}/e2e/reports/html/index.html)
    - [Snapshots](https://terebu.daznplatform.io/?prefix=${basePrefix}/e2e/snapshots/e2e)

    ### Preview
    
    - [Storybook](https://terebu.daznplatform.io/${basePrefix}/storybook/index.html)
    `;
}

module.exports.getMessage = getMessage;
