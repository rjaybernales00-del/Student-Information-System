document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('.login-form');
	const msg = document.getElementById('message');

	// Mock credential stores for demo purposes
	const teachers = {
		'teacher1@school.edu': 'teachpass',
		't.jones@school.edu': 'abc123'
	};

	const students = {
		's123456@school.edu': 'studentpass',
		'student1@school.edu': 'pass123'
	};

	function showMessage(text, type) {
		msg.textContent = text;
		msg.className = 'message ' + (type === 'success' ? 'success' : 'error');
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const id = String(form.student_id.value || '').trim().toLowerCase();
		const pwd = String(form.password.value || '');
		const selected = String(form.role.value || '').toLowerCase();

		// Determine role by credentials
		let foundRole = null;
		if (teachers[id] && teachers[id] === pwd) foundRole = 'teacher';
		else if (students[id] && students[id] === pwd) foundRole = 'student';

		if (!foundRole) {
			showMessage('Invalid credentials. Contact your administrator for assistance.');
			return;
		}

		if (foundRole !== selected) {
			showMessage("Please choose the correct account type.");
			return;
		}

		showMessage('Welcome ' + (foundRole === 'teacher' ? 'Teacher' : 'Student') + '! Logging you in...', 'success');

		// Demo behavior: compute absolute URL and redirect to appropriate dashboard
		setTimeout(function () {
			const targetPath = (foundRole === 'teacher') ? 'teacher/tdash.html' : 'student/sdash.html';
			const targetUrl = new URL(targetPath, window.location.href).href;
			console.debug('login redirect to', targetUrl, { id, selected, foundRole });
			window.location.href = targetUrl;
		}, 700);
	});
});

