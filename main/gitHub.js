
import { Octokit } from "@octokit/rest";
import { github } from "../main/vars.js";
import { sendLogs } from "./methods.js";
import { errorLogId } from "../main/vars.js";

export async function githubFileEdit(title, creds, FileContent) {

  const octokit = new Octokit({ auth: github.token });

  try {

    // Get the latest file contents
    const fileResponse = await octokit.repos.getContent({
      owner: github.owner,
      repo: creds.Repo,
      path: creds.FilePath,
    });

    // Extract the latest file SHA
    const { sha } = fileResponse.data;

    // Edit the file contents
    await octokit.repos.createOrUpdateFileContents({
      owner: github.owner,
      repo: creds.Repo,
      path: creds.FilePath,
      message: creds.CommitMsg,
      content: FileContent,
      sha,
      branch: creds.Branch,
    });

    return true;

  } catch (error) {

    const logMsg = `<blockquote><b>${title} ERROR  -  [ FILE EDIT ]</b></blockquote>`+
                   `\n\n<pre>${error}</pre>`
    await sendLogs(logMsg, errorLogId, null, "HTML");

  }
}


export async function triggerWorkflow(title, creds) {
  const octokit = new Octokit({ auth: github.token });

  try {
    await octokit.actions.createWorkflowDispatch({
      owner: github.owner,
      repo: creds.Repo,
      workflow_id: creds.workflowId,
      ref: creds.Branch,
      inputs: creds.inputs,
    });
    return true;

  } catch (error) {

    const logMsg = `<blockquote><b>${title} ERROR  -  [ WORKFLOW ]</b></blockquote>`+
                   `\n\n<pre>${error}</pre>`
    await sendLogs(logMsg, errorLogId, null, "HTML");

  }
}
