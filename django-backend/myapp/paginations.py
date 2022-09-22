from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict, namedtuple


class SetPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('current_displayable_pagination', self.get_html_context()),
            ('current_number', self.page.number),
            ('next', self.get_next_link()),
            ('next_number', self.get_next_number()),
            ('previous', self.get_previous_link()),
            ('previous_number', self.get_previous_number()),
            ('page_count', self.page.paginator.num_pages),
            ('results', data),
        ]))

    def get_previous_number(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        if page_number < 1:
            return None
        else:
            return page_number

    def get_next_number(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        if page_number < 1:
            return None
        else:
            return page_number
