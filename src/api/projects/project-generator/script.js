$(document).ready(function() {
    var c = 0;
    $("#btn").click(function(e) {
        c++;
        var jsonData = {};
        var formData = $("#project-form").serializeArray();

        formData.projectName += " " + c;
        formData.authorName += " " + c;

        $.each(formData, function() {
            jsonData.projectId = c;

            if (jsonData[this.name]) {
                if (!jsonData[this.name].push) {
                    jsonData[this.name] = [jsonData[this.name]];
                }
                jsonData[this.name].push(this.value || '');
            } else {
                jsonData[this.name] = this.value || '';
            }

            if (this.name == "projectName" || this.name == "authorName") {
                jsonData[this.name] += ` ${c}`;
            }
        });

        $('<div>')
            .html(JSON.stringify(jsonData, null, 4) + ",")
            .appendTo($('.result'));

        e.preventDefault();
    });
});