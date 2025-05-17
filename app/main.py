from flask import Flask, send_from_directory

from server.wrapper import main as main_blueprint

app = Flask(__name__,static_folder='frontend/dist')
app.register_blueprint(main_blueprint)

@app.route("/",defaults={"path":""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        logger.debug(f"app.static_folder={app.static_folder}, path={path}")
        return send_from_directory(app.static_folder, path)
    else:
        logger.debug(f"app.static_folder={app.static_folder}, path=index.html")
        return send_from_directory(app.static_folder, "index.html")

def main():
    app.run(
        host="localhost",
        port=5000,
        threaded=True,
    )

if __name__ == "__main__":
    main()