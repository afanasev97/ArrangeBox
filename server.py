from http.server import HTTPServer, CGIHTTPRequestHandler
server_addr = ("localhost", 4000)
httpd = HTTPServer(server_addr, CGIHTTPRequestHandler)
print(f'Server started at http://{server_addr[0]}:{server_addr[1]}')
httpd.serve_forever()
