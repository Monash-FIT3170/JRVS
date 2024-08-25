import Swal from 'sweetalert2';

export async function addBadge(badge_id, badge_name, userData, postData) {
    try {
      const username = userData.username;
      const badges = userData.badges;
      if (username !== '') {
        const badgeExists = badges.some(badge => badge.id === badge_id);
        if (!badgeExists) {
            await postData('api/users/addBadge', { username: username, newBadgeId: badge_id });
            // show badge achievement popup
            const result = await Swal.fire({
                title: badge_name,
                html: `Congratulations, you just unlocked a badge!<br></br>You can view it in your profile for more details.`,
                showCancelButton: true,
                confirmButtonText: 'View Now',
                cancelButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',     
                    htmlContainer: 'custom-swal-text'
                  }
              });
              
              if (result.isConfirmed) {
                window.location.href = '/profile';
              }
        }            
      }
    } catch (_) {
    }
}
