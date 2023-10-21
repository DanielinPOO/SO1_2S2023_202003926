// Code generated by protoc-gen-go. DO NOT EDIT.
// source: server.proto

package confproto

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type RequestId struct {
	Carnet               string   `protobuf:"bytes,1,opt,name=carnet,proto3" json:"carnet,omitempty"`
	Nombre               string   `protobuf:"bytes,2,opt,name=nombre,proto3" json:"nombre,omitempty"`
	Curso                string   `protobuf:"bytes,3,opt,name=curso,proto3" json:"curso,omitempty"`
	Nota                 string   `protobuf:"bytes,4,opt,name=nota,proto3" json:"nota,omitempty"`
	Semestre             string   `protobuf:"bytes,5,opt,name=semestre,proto3" json:"semestre,omitempty"`
	Year                 string   `protobuf:"bytes,6,opt,name=year,proto3" json:"year,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *RequestId) Reset()         { *m = RequestId{} }
func (m *RequestId) String() string { return proto.CompactTextString(m) }
func (*RequestId) ProtoMessage()    {}
func (*RequestId) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{0}
}

func (m *RequestId) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_RequestId.Unmarshal(m, b)
}
func (m *RequestId) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_RequestId.Marshal(b, m, deterministic)
}
func (m *RequestId) XXX_Merge(src proto.Message) {
	xxx_messageInfo_RequestId.Merge(m, src)
}
func (m *RequestId) XXX_Size() int {
	return xxx_messageInfo_RequestId.Size(m)
}
func (m *RequestId) XXX_DiscardUnknown() {
	xxx_messageInfo_RequestId.DiscardUnknown(m)
}

var xxx_messageInfo_RequestId proto.InternalMessageInfo

func (m *RequestId) GetCarnet() string {
	if m != nil {
		return m.Carnet
	}
	return ""
}

func (m *RequestId) GetNombre() string {
	if m != nil {
		return m.Nombre
	}
	return ""
}

func (m *RequestId) GetCurso() string {
	if m != nil {
		return m.Curso
	}
	return ""
}

func (m *RequestId) GetNota() string {
	if m != nil {
		return m.Nota
	}
	return ""
}

func (m *RequestId) GetSemestre() string {
	if m != nil {
		return m.Semestre
	}
	return ""
}

func (m *RequestId) GetYear() string {
	if m != nil {
		return m.Year
	}
	return ""
}

type ReplyInfo struct {
	Info                 string   `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ReplyInfo) Reset()         { *m = ReplyInfo{} }
func (m *ReplyInfo) String() string { return proto.CompactTextString(m) }
func (*ReplyInfo) ProtoMessage()    {}
func (*ReplyInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_ad098daeda4239f7, []int{1}
}

func (m *ReplyInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ReplyInfo.Unmarshal(m, b)
}
func (m *ReplyInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ReplyInfo.Marshal(b, m, deterministic)
}
func (m *ReplyInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ReplyInfo.Merge(m, src)
}
func (m *ReplyInfo) XXX_Size() int {
	return xxx_messageInfo_ReplyInfo.Size(m)
}
func (m *ReplyInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_ReplyInfo.DiscardUnknown(m)
}

var xxx_messageInfo_ReplyInfo proto.InternalMessageInfo

func (m *ReplyInfo) GetInfo() string {
	if m != nil {
		return m.Info
	}
	return ""
}

func init() {
	proto.RegisterType((*RequestId)(nil), "confproto.requestId")
	proto.RegisterType((*ReplyInfo)(nil), "confproto.replyInfo")
}

func init() {
	proto.RegisterFile("server.proto", fileDescriptor_ad098daeda4239f7)
}

var fileDescriptor_ad098daeda4239f7 = []byte{
	// 214 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x54, 0x8f, 0xb1, 0x4a, 0xc4, 0x40,
	0x10, 0x86, 0x8d, 0x26, 0xd1, 0x0c, 0xc1, 0x62, 0x09, 0xb2, 0xa4, 0x51, 0x52, 0x59, 0xad, 0xa0,
	0x9d, 0x76, 0x82, 0x45, 0x5a, 0x4b, 0xbb, 0x24, 0x4e, 0x8e, 0x83, 0xcb, 0x6e, 0x6e, 0x76, 0x73,
	0x90, 0x07, 0xb9, 0xf7, 0x3d, 0x76, 0x36, 0x2c, 0x5c, 0x35, 0xff, 0xf7, 0xcd, 0x30, 0xcc, 0x40,
	0x69, 0x91, 0x4e, 0x48, 0x6a, 0x26, 0xe3, 0x8c, 0x28, 0x06, 0xa3, 0x47, 0x8e, 0xcd, 0x39, 0x81,
	0x82, 0xf0, 0xb8, 0xa0, 0x75, 0xed, 0xbf, 0x78, 0x82, 0x7c, 0xe8, 0x48, 0xa3, 0x93, 0xc9, 0x4b,
	0xf2, 0x5a, 0xfc, 0x6e, 0xe4, 0xbd, 0x36, 0x53, 0x4f, 0x28, 0x6f, 0x83, 0x0f, 0x24, 0x2a, 0xc8,
	0x86, 0x85, 0xac, 0x91, 0x77, 0xac, 0x03, 0x08, 0x01, 0xa9, 0x36, 0xae, 0x93, 0x29, 0x4b, 0xce,
	0xa2, 0x86, 0x07, 0x8b, 0x13, 0x5a, 0x47, 0x28, 0x33, 0xf6, 0x91, 0xfd, 0xfc, 0x8a, 0x1d, 0xc9,
	0x3c, 0xcc, 0xfb, 0xdc, 0x3c, 0xfb, 0xb3, 0xe6, 0xc3, 0xda, 0xea, 0x91, 0x17, 0xee, 0xf5, 0x68,
	0xb6, 0xa3, 0x38, 0xbf, 0xff, 0xc0, 0xfd, 0x0e, 0x1d, 0xb7, 0x3f, 0x01, 0x08, 0xdd, 0x42, 0x9a,
	0xa9, 0x52, 0xf1, 0x3b, 0x15, 0x3f, 0xab, 0xaf, 0xed, 0xb6, 0xb8, 0xb9, 0xf9, 0x7e, 0xfc, 0x2b,
	0xd5, 0xdb, 0x57, 0xec, 0xf5, 0x39, 0x97, 0x8f, 0x4b, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf3, 0xdf,
	0x51, 0xf2, 0x31, 0x01, 0x00, 0x00,
}
