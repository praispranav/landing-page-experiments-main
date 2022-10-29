const { merge } = require('mochawesome-merge');
const reportGenerator = require('mochawesome-report-generator');
const { log } = require('console');

const reportDir = 'cypress/reports/html';
const mergeOptions = {
    files: ['cypress/reports/json/*.json'],
};

const getReportTitle = (buildInfo = 'local') => {
    const date = new Date().toISOString();
    return `LP Experiments - ${buildInfo} - ${date}`;
};

const reportOptions = {
    reportDir,
    code: false,
    showSkipped: true,
    charts: true,
    assetsDir: `${reportDir}/assets`,
    reportPageTitle: 'LP Experiments UI Test Report',
    reportTitle: getReportTitle(process.env.DRONE_BUILD_NUMBER),
    reportFilename: 'index',
};

const generateReport = async () => {
    const { DRONE_BUILD_NUMBER, DRONE_REPO_NAME, DRONE_BRANCH } = process.env;
    const report = await merge(mergeOptions);
    await reportGenerator.create(report, reportOptions);

    log(
        'Report link successfully created:',
        `https://terebu.daznplatform.io/${DRONE_REPO_NAME}/dev/${DRONE_BRANCH}/${DRONE_BUILD_NUMBER}/ui/index.html`,
    );
};

generateReport();
