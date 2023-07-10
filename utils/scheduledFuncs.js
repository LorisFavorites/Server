const cron = require("node-cron");

exports.initScheduledJobs = () => {
    const scheduledFunction = cron.schedule('* * * * *', () => {
        console.log('Running scheduled task');
    });

    scheduledFunction.start();
};