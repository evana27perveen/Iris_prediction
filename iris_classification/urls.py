from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('apis/', include('App_main.urls')),
    path('api/', include('rest_framework.urls')),

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
