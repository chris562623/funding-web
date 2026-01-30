function toggleThread(threadId) {
    const thread = document.getElementById(threadId);
    const btn = thread.querySelector(':scope > .comment-card .toggle-replies');
    if (!btn) return;

    thread.classList.toggle('expanded');

    if (thread.classList.contains('expanded')) {
        btn.textContent = btn.textContent.replace('View', 'Hide');
    } else {
        btn.textContent = btn.textContent.replace('Hide', 'View');
    }
}

function toggleReplyInput(threadId) {
    const inputContainer = document.getElementById(`input-${threadId}`);
    inputContainer.classList.toggle('active');
    if (inputContainer.classList.contains('active')) {
        inputContainer.querySelector('textarea').focus();
    }
}

function postMainComment() {
    const textarea = document.getElementById('main-comment-text');
    const text = textarea.value;
    if (!text.trim()) return;

    const section = document.getElementById('comment-section');
    const newId = 'thread-' + Date.now();

    const newThread = createThreadElement(newId, text, true);
    section.prepend(newThread);

    textarea.value = '';
}

function addComment(parentId) {
    const inputContainer = document.getElementById(`input-${parentId}`);
    const textarea = inputContainer.querySelector('textarea');
    const text = textarea.value;

    if (!text.trim()) return;

    const parentThread = document.getElementById(parentId);
    const newId = 'thread-' + Date.now();

    const newThread = createThreadElement(newId, text, false);
    parentThread.appendChild(newThread);

    if (!parentThread.classList.contains('expanded')) {
        parentThread.classList.add('expanded');
        const toggleBtn = parentThread.querySelector(':scope > .comment-card .toggle-replies');
        if (toggleBtn) {
            toggleBtn.textContent = toggleBtn.textContent.replace('View', 'Hide');
        }
    }

    textarea.value = '';
    toggleReplyInput(parentId);
}

function createThreadElement(id, text, isRoot) {
    const thread = document.createElement('div');
    thread.className = `comment-thread expanded ${isRoot ? 'root-thread' : ''}`;
    thread.id = id;
    thread.innerHTML = `
                <div class="comment-card">
                    <div class="comment-header">
                        <div class="profile">
                            <!-- <i class="fa-solid fa-user"></i> -->
                            <img src="./imgs/profile.jpeg" alt="">
                        </div>
                        <span class="author-name">You (User)</span>
                    </div>
                    <p class="comment-body">${text}</p>
                    <div class="comment-footer">
                        <button class="action-btn" onclick="toggleReplyInput('${id}')">Reply</button>
                        <button class="action-btn no-replies">no Replies</button>
                    </div>
                    <div class="reply-input-container" id="input-${id}">
                        <textarea placeholder="Write a reply..."></textarea>
                        <div class="input-actions">
                            <button class="cancel-btn" onclick="toggleReplyInput('${id}')">cancel</button>
                            <button class="post-c-btn" onclick="addComment('${id}')">send</button>
                        </div>
                    </div>
                </div>
            `;
    return thread;
}