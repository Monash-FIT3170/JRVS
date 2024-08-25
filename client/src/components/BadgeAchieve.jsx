import Swal from 'sweetalert2';


// create new badge: 
//      can use set badge api call or clone in mongodb to make a new badge
// using badge trigger:
//     the badge id is the auto generated odcument id within mongodb
//     need to copy and paste into the badge trigger where used so it grabs the right badge doc
//     badge_name doesnt matter, its just what is displayed as the title in the popup
// badge images:
//      can use badge1-4, otherwise add a png image to the images folder
//      use the image name without .png in the monogodb document for the badge
//      in BadgeDisplay.jsx, import the image and add it to the badgeImages array
// (see CustomizePage for an example usage)
export async function triggerBadge(badge_id, badge_name, userData, postData) {
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
