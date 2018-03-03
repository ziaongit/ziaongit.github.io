$(document).ready(function(){

    $('#searchUser').on('keyup', function(e){
        var username = e.target.value;
        
        $.ajax({

            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: '44c8eba09b37afa04e77',
                client_secret: '1b467fa0fc1aab6ad92d1c8dec3e11686ec7f70a'
            }
    
        }).done(function(user){

            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos',
                data: {
                client_id: '44c8eba09b37afa04e77',
                client_secret: '1b467fa0fc1aab6ad92d1c8dec3e11686ec7f70a',
                sort: 'created: asc'
            }

            }).done(function(repos){
                $.each(repos, function(index, repo){
                    
                    var repoTemplate = '\
                        <div class="well">\
                            <div class="row">\
                                <div class="col-md-6 repo-description">\
                                    <p><strong>'+repo.name+'</strong>: '+repo.description+'</p>\
                                </div>\
                                <div class="col-md-4">\
                                    <span class="label label-default">Language: '+repo.forks_count+'</span>\
                                    <span class="label label-primary">Watchers: '+repo.watchers_count+'</span>\
                                    <span class="label label-success">Stargazers: '+repo.stargazers_count+'</span>\
                                </div>\
                                <div class="col-md-2">\
                                    <a class="btn btn-default btn-block" target="_blank" href="'+repo.html_url+'">Repo Page</a>\
                                </div>\
                            </div>\
                        </div>\
                    ';

                    $('#repos').append(repoTemplate);
                });
            });

            var generalInfoTemplate ='\
                <div class="panel panel-default"> \
                    <div class="panel-heading">\
                        <h3 class="panel-title">'+user.name+'</h3>\
                    </div>\
                    <div class="panel-body">\
                        <div class="row">\
                            <div class="col-md-3">\
                                <img class="thumbnail avatar" src="'+user.avatar_url+'">\
                                <a target="_blank" class="btn btn-primary btn-block" href="'+user.html_url+'">View Profile</a>\
                            </div>\
                            <div class="col-md-9">\
                                <div class="user-bul">\
                                    <span class="label label-default">Public Repos: '+user.public_repos+'</span>\
                                    <span class="label label-primary">Public Gists: '+user.public_gists+'</span>\
                                    <span class="label label-success">Followers: '+user.followers+'</span>\
                                    <span class="label label-info">Following: '+user.following+'</span>\
                                </div>\
                                <ul>\
                                    <li class="list-group-item">Company: '+user.company+'</li>\
                                    <li class="list-group-item">Website/Blog: <a target="_blank" href="'+user.blog+'">'+user.blog+'</a></li>\
                                    <li class="list-group-item">Location: '+user.location+'</li>\
                                    <li class="list-group-item">Member Since: '+user.created_at+'</li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <h3 class="page-header">Latest Repos</h3>\
                <div id="repos"></div>\
                ';            
            $('#profile').html(generalInfoTemplate);
        });

    });




});