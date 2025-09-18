package org.openlmis.web.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;

public class ForwardedProtoFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException { }

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest request = (HttpServletRequest) req;
    String proto = request.getHeader("X-Forwarded-Proto");
    if ("https".equalsIgnoreCase(proto)) {
      // Wrap para que request.isSecure() e getScheme() passem a ser https
      request = new HttpServletRequestWrapper(request) {
        @Override
        public boolean isSecure() {
          return true;
        }
        @Override
        public String getScheme() {
          return "https";
        }
      };
    }
    chain.doFilter(request, res);
  }

  @Override
  public void destroy() { }
}

