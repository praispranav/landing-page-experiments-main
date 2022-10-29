const messageTitle = '📖 TERRAFORM PLAN';

const getTitle = (environment) => `${messageTitle} - ${environment}`;
module.exports.getTitle = getTitle;

function getMessage({ require, environment }, status, tfPlan) {
    const outdent = require('outdent');

    return outdent`
    ## ${getTitle(environment)}

    #### Status: \`${status}\`
    
    <details>
      <summary>Show Plan</summary>
      
      \`\`\`
      ${tfPlan}
      \`\`\`
    </details>
  `;
}

module.exports.getMessage = getMessage;
