document.getElementById('search-btn').addEventListener('click', async function () {
    const artist = document.getElementById('artist').value.trim();
    const song = document.getElementById('song').value.trim();

    if (artist === '' || song === '') {
        alert('Please enter both the artist and song title.');
        return;
    }

    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert('Song lyrics not found. Please check the artist or song title.');
        } else {
            const lyrics = data.lyrics;
            const firstTenLines = lyrics.split('\n').slice(0, 10).join('\n');
            document.getElementById('song-title').textContent = `${artist} - ${song}`;
            document.getElementById('lyrics').textContent = firstTenLines;
        }

        document.getElementById('artist').value = '';
        document.getElementById('song').value = '';

    } catch (error) {
        console.error(error);
        alert('There was an error fetching the lyrics. Please try again.');
    }
});
